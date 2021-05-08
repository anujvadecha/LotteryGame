from GameMasterApp.handlers.BaseHandler import BaseHandler


class PlayerHandler(BaseHandler):

    def __init__(self, user):
        super().__init__(user)

    def calculate_total_debit(self):
        pass
