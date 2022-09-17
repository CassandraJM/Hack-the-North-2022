from flask import Flask

app = Flask(__name__)

all_ideas = {str, [str, [(str, int)], str]}
COMMAND_CREATE = 'Create'
COMMAND_EXPAND = 'Expand'
COMMAND_SHRINK = 'Shrink'
COMMAND_ERROR = 'Error'


@app.route('/<string:new_input>', methods=['POST'])
def process_human_input(new_input):
    text = new_input
    command_word = _get_command_word(text)
    if text[:6].casefold() == COMMAND_CREATE.casefold():
        # send text[6:] to model
        # add bubble with summary, related queries
        # add summary to all_human_bubbles
        # make new bubble current point
        pass
    elif text[:6].casefold() == COMMAND_EXPAND.casefold():
        if text[4:] in all_human_bubbles:
            # make bubble current point
            pass
        else:
            pass
    elif text[:len(COMMAND_SHRINK)].casefold() == COMMAND_SHRINK.casefold():
        if text[len(COMMAND_SHRINK):] not in all_human_bubbles:
            # add new bubble to origin, generate summary, related queries
            pass
        else:
            pass
    else:
        # incorrect command word
        pass


def _get_command_word(text):
    if text[:6].casefold() == COMMAND_CREATE.casefold():
        return COMMAND_CREATE
    elif text[:4].casefold() == COMMAND_MOVE.casefold():
        return COMMAND_MOVE
    elif text[:len(COMMAND_BRANCH)].casefold() == COMMAND_BRANCH.casefold():
        return COMMAND_BRANCH
    else:
        return COMMAND_ERROR


if __name__ == '__main__':
    app.run()
