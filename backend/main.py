from flask import Flask

app = Flask(__name__)

all_human_bubbles = []
related_queries = {}
continue_program = True
COMMAND_CREATE = 'Create'
COMMAND_MOVE = 'Move'
COMMAND_BRANCH = 'Branch from origin'


@app.route('/<string:new_input>', methods=['POST'])
def process_human_input(new_input):
    text = new_input


if __name__ == '__main__':
    app.run()
