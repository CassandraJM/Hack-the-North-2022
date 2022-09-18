from ssl import ALERT_DESCRIPTION_BAD_CERTIFICATE_HASH_VALUE
from flask import Flask
from flask import request
import pandas as pd
import re
import os
import psycopg2
from flask_cors import CORS
from mlFuncs import get_summary, get_predictions

# Create a cursor.
user = "Rohit"
host = "free-tier14.aws-us-east-1.cockroachlabs.cloud"
cluster = "yeti-chimera-5034"
password = "gavDhGqwRAmRg1L6K493VA"


connection = psycopg2.connect(user=user,
                              host=host,
                              port=26257,
                              database=f'{cluster}.defaultdb',
                              password=password,
                              # sslmode='verify-full'
                              )

# Set to automatically commit each statement
connection.set_session(autocommit=True)

cursor = connection.cursor()

# cursor.execute("""DROP DATABASE IF EXISTS Brainstorm;
#                 CREATE DATABASE Brainstorm; Use Brainstorm;""")
cursor.execute("""DROP TABLE IF EXISTS Idea CASCADE;
                  CREATE TABLE Idea(iID serial PRIMARY KEY, summary varchar(500)
                , parent varchar(500), input int);""")


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# summary, parent (summary), type, child summary, original input, parentID
all_ideas = {str: [str, [(int, str)], str, int]}
newly_added_ideas = {str: [str, [(int, str)], str, int]}
COMMAND_CREATE = 'Create'
COMMAND_EXPAND = 'Expand'
COMMAND_SHRINK = 'Shrink'
COMMAND_ERROR = 'Error'
CHILD_BUBBLES = 0
PREDICTIONS = 1
IMAGES = 2
BID: int


# password: gavDhGqwRAmRg1L6K493VA
# connection string: postgresql://Rohit:gavDhGqwRAmRg1L6K493VA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dyeti-chimera-5034
###
# {
#     input: string,
#     parent: string,
# }
###

@app.route('/api/save', methods=['POST'])
def process_save_press():
    for idea in newly_added_ideas:
        summary = idea
        parent = newly_added_ideas[idea][0]
        input = newly_added_ideas[idea][2]
        child_type = newly_added_ideas[idea][1][0]
        cursor.execute("""INSERT INTO Idea values (%s, %s, %s) RETURNING iID;
                            """, (summary, parent, input))
        iID = cursor.fetchone()[0]
        parent_id = newly_added_ideas[idea][3]
        cursor.execute(
            """INSERT INTO ChildRelationship values (%s, %s, %s);""",
            (parent_id, iID, child_type))
    newly_added_ideas = []


@app.route('/api/load', methods=['GET'])
def process_load_press():
    bID = request.json('bID')
    all_ideas = {}
    #{str: [str, [(int, str)], str, int]}
    cursor.execute("""SELECT i.iID, i.summary, i.parent, i.input FROM Idea i JOIN Brainstorm b ON
    i.iID = b.bID WHERE b.bID = %s;""", (bID, ))
    for idea in cursor:
        if idea[1] not in all_ideas:
            all_ideas[idea[1]] = [idea[2], [], idea[3], -1]
    cursor.execute("""SELECT i.iID, i.summary, c.type, c.pID FROM Idea i JOIN ChildRelationship c
    ON i.iID = c.cID JOIN Brainstorm b on b.bID = i.iID WHERE b.bID = %s""", (bID, ))
    for idea in cursor:
        all_ideas[idea[3]][1] += (idea[2], idea[1])
    cursor.execute("""SELECT c.pID, c.cID from ChildRelationship c JOIN Brainstorm b ON c.cID = b.iID
    WHERE b.bID = %s""", (bID, ))
    for idea in cursor:
        all_ideas[idea[1]][3] = idea[0]
    return all_ideas
    # SELECT i.iID, i.summary, JSON_ARRAY(SELECT JSON_ARRAY(c.type, a.summary) FROM ChildRelationship c
    #     LEFT JOIN Idea a
    #         ON a.iID = c.pID) AS children
    # FROM Idea i
    # LEFT JOIN Branstorm b
    #     i.iID = b.iID
    # WHERE b.bID = 2

    # cursor.execute("""SELECT i.iID, i.summary, i.parent, i.input, c.cID, c.type
    #  FROM Idea i JOIN ChildRelationship c ON i.iID = c.pID JOIN Brainstorm b ON b.iID =
    #  i.iID WHERE b.bID = %s;""", (bID,))
    # for idea in cursor:
    #     if idea[1] not in all_ideas:
    #         all_ideas[idea[1]] = {}


@app.route('/api/create', methods=['POST'])
def process_human_input():
    new_input = request.json['input']
    parent = request.json['parent']
    df = get_summary(new_input)
    print(df)
    summary = df.iloc[0][:-1]
    counter = 1
    while summary in all_ideas:
        summary = df.iloc[counter][:-1]
        counter += 1
    prediction = get_predictions(summary)  # string
    print(prediction)
    prediction = re.sub("[0-9]\. ", '', prediction)
    prediction = [i for i in prediction.split("\n") if i.strip()]
    all_ideas[summary] = [parent, [], new_input]
    for i in prediction:
        all_ideas[summary][1].append((PREDICTIONS, i))
    return [summary, prediction]


###
# {
#     parent: string,
# }
###
@app.route('/api/expand', methods=['POST'])
def expand():
    parent = request.json['parent']
    parents_children = all_ideas[parent][1]
    grandchildren = {}  # {str: [(int, str)]}
    for child in parents_children:  # child is a tuple (type, child name)
        grandchildren[child[1]] = all_ideas[child[1]][1]
    return grandchildren


if __name__ == '__main__':
    app.run()
