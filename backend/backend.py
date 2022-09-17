

class Board:

    all_human_bubbles = []
    related_queries = {}
    continue_program = True
    COMMAND_CREATE = 'Create'
    COMMAND_MOVE = 'Move'
    COMMAND_BRANCH = 'Branch from origin'

    def __init__(self) -> None:
        get_idea()


if __name__ == '__main__':
    board = Board()
    board.start
