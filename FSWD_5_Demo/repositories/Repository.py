from .Database import Database

class DataRepository:
    @staticmethod
    def read_klanten():
        sql = "SELECT * FROM tblklant"
        return Database.get_rows(sql)

    @staticmethod
    def read_klant(KlantID):
        sql = "SELECT * FROM tblklant WHERE KlantID = %s"
        params = [KlantID]
        return Database.get_one_row(sql, params)

    @staticmethod
    def create_klant(naam, voornaam, straat, nr, postcode, gemeente):
        sql = "INSERT INTO tblklant (Fnaam, Vnaam, Straat, Nummer, Postcode, Gemeente) VALUES (%s, %s, %s, %s, %s, %s)"
        params = [naam, voornaam, straat, nr, postcode, gemeente]
        return Database.execute_sql(sql, params)