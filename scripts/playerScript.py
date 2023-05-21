import random
from faker import Faker


class Player:

    def __init__(self, name, country, rating, is_master, start_year, description, user):
        self.description = description
        self.start_year = start_year
        self.is_master = is_master
        self.rating = rating
        self.country = country
        self.name = name
        self.user = user


def generate_players(amount):
    faker: Faker = Faker()
    players = []

    for i in range(amount):
        name = faker.name()

        country = faker.country()
        if "'" in country:
            country = country.replace("'", "")

        rating = random.randint(400, 3000)
        is_master = random.randint(0, 1)
        start_year = random.randint(1800, 2023)
        description = faker.sentence()
        user = random.randint(0, 10000)

        if i % 10000 == 0 and i > 0:
            print(f"Generated {i}")

        players.append(Player(name, country, rating, is_master, start_year, description, user))

    return players


def generate_players_sql(players):

    with open("players.sql", "w") as file:
        file.write("truncate table \"tblChessPlayers\" restart identity cascade;")

    sql = "insert into \"tblChessPlayers\" (\"Name\", \"Country\", \"Rating\", \"IsMaster\", \"StartYear\", \"Description\", \"UserID\") values "
    i = 0

    for playa in players:
        sql += f"('{playa.name}', '{playa.country}', {playa.rating}, {playa.is_master}, {playa.start_year}, '{playa.description}', {playa.user}),"
        if i % 100 == 0 and i != 0:
            with open("players.sql", "a") as file:
                file.write(sql[:-1] + ";")

            print(f'Written {i} ')
            sql = "insert into \"tblChessPlayers\" (\"Name\", \"Country\", \"Rating\", \"IsMaster\", \"StartYear\", \"Description\", \"UserID\") values "

        i += 1

    if sql != "insert into \"tblChessPlayers\" (\"Name\", \"Country\", \"Rating\", \"IsMaster\", \"StartYear\", \"Description\", \"UserID\") values ":
        with open("players.sql", "a") as file:
            file.write(sql[:-1] + ";")

    print("Done")
