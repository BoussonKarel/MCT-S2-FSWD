from .Database import Database


class DataRepository:
    @staticmethod
    def json_or_formdata(request):
        if request.content_type == 'application/json':
            gegevens = request.get_json()
        else:
            gegevens = request.form.to_dict()
        return gegevens

    #########  Treinen  #########
    @staticmethod
    def read_treinen():
        sql = "SELECT * FROM treinen"
        return Database.get_rows(sql)

    @staticmethod
    def read_trein(idtrein):
        sql = "SELECT * FROM treinen WHERE idtrein = %s"
        params = [ idtrein ]
        return Database.get_one_row(sql, params)

    @staticmethod
    def read_treinen_met_bestemming(bestemmingid):
        sql = "SELECT * FROM treinen WHERE bestemmingid = %s"
        params = [ bestemmingid ]
        return Database.get_rows(sql, params)

    @staticmethod
    def create_trein(vertrek, bestemmingid, spoor, vertraging, afgeschaft):
        sql = "INSERT INTO treinen (vertrek, bestemmingid, spoor, vertraging, afgeschaft) VALUES (%s, %s, %s, %s, %s)"
        params = [ vertrek, bestemmingid, spoor, vertraging, afgeschaft ]
        return Database.execute_sql(sql, params)

    @staticmethod
    def update_trein(vertrek, bestemmingid, spoor, vertraging, afgeschaft, idtrein):
        sql = "UPDATE treinen SET vertrek = %s, bestemmingid = %s, spoor = %s, vertraging = %s, afgeschaft = %s WHERE idtrein = %s"
        params = [ vertrek, bestemmingid, spoor, vertraging, afgeschaft, idtrein ]
        return Database.execute_sql(sql, params)

    @staticmethod
    def delete_trein(idtrein):
        sql = "DELETE FROM treinen WHERE idtrein = %s"
        params = [ idtrein ]
        return Database.execute_sql(sql, params)

    @staticmethod
    def update_trein_vertraging (idtrein, vertraging):
        sql = "UPDATE treinen SET vertraging = %s WHERE idtrein = %s"
        params = [ vertraging, idtrein ]
        return Database.execute_sql(sql, params)

    #########  Bestemmingen  #########
    @staticmethod
    def read_bestemmingen():
        sql = "SELECT * FROM bestemmingen ORDER BY stad"
        return Database.get_rows(sql)
