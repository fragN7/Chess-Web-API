import random
from faker import Faker


class Champion:

    def __init__(self, last_trophy, record, max_rating, consecutive_years, current, description, player_id):
        self.description = description
        self.last_trophy = last_trophy
        self.record = record
        self.max_rating = max_rating
        self.consecutive_years = consecutive_years
        self.current = current
        self.player_id = player_id


def generate_champion(amount):
    faker: Faker = Faker()
    champions = []

    for i in range(amount):

        last_trophy = faker.word() + " Trophy"
        last_trophy = last_trophy.capitalize()

        record = random.randint(0, 500).__str__() + "-" + random.randint(0, 500).__str__() + "-" + random.randint(0, 500).__str__()

        max_rating = random.randint(1200, 3000)
        consecutive_years = random.randint(0, 20)
        current = random.randint(0, 1)
        description = faker.sentence()
        player_id = random.randint(1, 100_000)

        if i % 10000 == 0 and i > 0:
            print(f"Generated {i}")

        champions.append(Champion(last_trophy, record, max_rating, consecutive_years, current, description, player_id))

    return champions


def generate_champions_sql(champions):

    with open("champions.sql", "w") as file:
        file.write("truncate table \"tblChessChampions\" restart identity cascade;")

    sql = "insert into \"tblChessChampions\" (\"LastTrophy\", \"Record\", \"MaxRating\", \"ConsecutiveYears\", \"Current\", \"Description\", \"ChessPlayerID\") values "
    i = 0

    for champ in champions:
        sql += f"('{champ.last_trophy}', '{champ.record}', {champ.max_rating}, {champ.consecutive_years}, {champ.current}, '{champ.description}', {champ.player_id}),"
        if i % 100 == 0 and i != 0:
            with open("champions.sql", "a") as file:
                file.write(sql[:-1] + ";")

            print(f'Written {i} ')
            sql = "insert into \"tblChessChampions\" (\"LastTrophy\", \"Record\", \"MaxRating\", \"ConsecutiveYears\", \"Current\", \"Description\", \"ChessPlayerID\") values "

        i += 1

    if sql != "insert into \"tblChessChampions\" (\"LastTrophy\", \"Record\", \"MaxRating\", \"ConsecutiveYears\", \"Current\", \"Description\", \"ChessPlayerID\") values ":
        with open("champions.sql", "a") as file:
            file.write(sql[:-1] + ";")

    print("Done")
