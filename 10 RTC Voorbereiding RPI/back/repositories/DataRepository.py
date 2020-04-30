from .Database import Database


class DataRepository:
    @staticmethod
    def json_or_formdata(request):
        if request.content_type == 'application/json':
            gegevens = request.get_json()
        else:
            gegevens = request.form.to_dict()
        return gegevens

    @staticmethod
    def read_status_lampen():
        sql = "SELECT * FROM lampen"
        return Database.get_rows(sql)

    @staticmethod
    def read_status_lamp_by_id(id):
        sql = "SELECT * FROM lampen WHERE id = %s"
        params = [ id ]
        return Database.get_one_row(sql, params)

    @staticmethod
    def update_status_lamp(id, status):
        sql = "UPDATE lampen SET status = %s WHERE id = %s"
        params = [ status, id ]
        return Database.execute_sql(sql, params)

    @staticmethod
    def update_status_alle_lampen(status):
        sql = "UPDATE lamen SET status = %s"
        params = [ status ]
        return Database.execute_sql(sql, params)

    # vul hier de verschillende functies aan om je database aan te spreken
