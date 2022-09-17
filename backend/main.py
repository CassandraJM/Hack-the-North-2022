from flask import Flask
from flask import request
import pandas as pd

app = Flask(__name__)

all_ideas = {str: [str, [(str, int)], str]}
COMMAND_CREATE = 'Create'
COMMAND_EXPAND = 'Expand'
COMMAND_SHRINK = 'Shrink'
COMMAND_ERROR = 'Error'
CHILD_BUBBLES = 0
PREDICTIONS = 1
IMAGES = 2

###
# {
#     input: string,
#     parent: string,
# }
###


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
    prediction = get_prediction(summary)
    all_ideas[summary] = [parent, [(PREDICTIONS, prediction)], new_input]
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
