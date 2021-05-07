from GameMasterApp.handlers.AgentHandler import AgentHandler
from GameMasterApp.handlers.PlayerHandler import PlayerHandler


class UserHandlerProxy:

    def __init__(self,user):
        self.handler = None
        if user.user_type == 'AGENT':
            self.handler = AgentHandler(user = user)
        if user.user_type == 'PLAYER':
            self.handler = PlayerHandler(user = user)

    def __getattr__(self, attr):
        return getattr(self.handler, attr)
