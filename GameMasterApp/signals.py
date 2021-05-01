from django.db.models.signals import post_save
from django.dispatch import receiver

from GameMasterApp.models import UserLedgerHistory, TotalDebitCredit, TicketID


# @receiver(post_save,sender=UserLedgerHistory)
# def post_save_user_ledger(sender, instance, created, **kwargs):
#     totaldebitcreditobj = TotalDebitCredit.objects.filter(created_at__date=instance.created_at.date(), user=instance.user)
#     if totaldebitcreditobj:
#         totaldebitcreditobj[0].credit = totaldebitcreditobj[0].credit + instance.credit
#         totaldebitcreditobj[0].debit = totaldebitcreditobj[0].debit + self.debit
#         totaldebitcreditobj[0].save()
#     else:
#         TotalDebitCredit.objects.create(credit=self.credit, debit=self.debit, user=self.user)
#


@receiver(post_save,sender=TicketID)
def postSaveTicket(sender, instance, created, **kwargs):

    pass
