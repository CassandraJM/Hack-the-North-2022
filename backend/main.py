from flask import Flask
from flask import request
import pandas as pd
import re
import os
import psycopg2
from flask_cors import CORS

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
                              sslmode='verify-full')

# Set to automatically commit each statement
connection.set_session(autocommit=True)

cursor = connection.cursor()

cursor.execute("""DROP DATABASE IF EXISTS Brainstorm; 
                CREATE DATABASE Brainstorm; Use Brainstorm;""")
cursor.execute("""DROP TABLE IF EXISTS Idea CASCADE;
                  CREATE TABLE Idea(iID serial PRIMARY KEY, summary varchar(500) 
                , parent varchar(500), input int);""")


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# summary, parent (summary), type, child summary, original input, parentID
all_ideas = {str: [str, [(int, str)], str, int]}
newly_added_ideas = {str: [str, [(int, str)], str]}
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
        cursor.execute("""INSERT INTO Idea values (%s, %s, %s);
                            """, (summary, parent, input))
    newly_added_ideas = []


@app.route('/api/load', methods=['GET'])
def process_load_press():
    pass


@app.route('/api/create', methods=['POST'])
def process_human_input():
    new_input = request.json['input']
    parent = request.json['parent']
    command_word = _get_command_word(text)
    df = get_summary(new_input)
    summary = df.loc[0]
    counter = 1
    while summary in all_ideas:
        summary = df.loc[counter]
        counter += 1
    prediction = get_prediction(summary)  # string
    prediction = re.sub("^[0-9]\.", '\n', prediction)
    prediction = prediction.split("\n")
    all_ideas[summary] = [parent, [(PREDICTIONS, prediction)], new_input]
    for i in prediction:
        all_ideas[summary][1].append((PREDICTIONS, i))
    return {summary, prediction}


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
