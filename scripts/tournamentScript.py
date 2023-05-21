import random
from faker import Faker


class Tournament:

    def __init__(self, name, num_participants, host, prize, trophy, description, user):
        self.name = name
        self.num_participants = num_participants
        self.host = host
        self.prize = prize
        self.trophy = trophy
        self.description = description
        self.user = user


def generate_tournaments(amount):
    faker: Faker = Faker()
    tournaments = []

    for i in range(amount):
        name = faker.name()
        host = faker.country()
        if "'" in host:
            host = host.replace("'", "")

        prize = random.randint(400, 3000)

        powers_of_2 = [2 ** i for i in range(14)]
        num_participants = random.choice(powers_of_2)

        trophy = faker.word() + " Trophy"
        trophy = trophy.capitalize()

        description = faker.sentence()
        user = random.randint(1, 10000)

        if i % 10000 == 0 and i > 0:
            print(f"Generated {i}")

        tournaments.append(Tournament(name, num_participants, host, prize, trophy, description, user))

    return tournaments


def generate_tournament_sql(players):

    with open("tournaments.sql", "w") as file:
        file.write("truncate table \"tblChessTournaments\" restart identity cascade;")

    sql = "insert into \"tblChessTournaments\" (\"Name\", \"NumParticipants\", \"Host\", \"PrizeMoney\", \"Trophy\", \"Description\", \"UserID\") values "
    i = 0

    for playa in players:
        sql += f"('{playa.name}', {playa.num_participants}, '{playa.host}', {playa.prize}, '{playa.trophy}', '{playa.description}', {playa.user}),"
        if i % 100 == 0 and i != 0:
            with open("tournaments.sql", "a") as file:
                file.write(sql[:-1] + ";")

            print(f'Written {i} ')
            sql = "insert into \"tblChessTournaments\" (\"Name\", \"NumParticipants\", \"Host\", \"PrizeMoney\", \"Trophy\", \"Description\", \"UserID\") values "
        i += 1

    if sql != "insert into \"tblChessTournaments\" (\"Name\", \"NumParticipants\", \"Host\", \"PrizeMoney\", \"Trophy\", \"Description\", \"UserID\") values ":
        with open("tournaments.sql", "a") as file:
            file.write(sql[:-1] + ";")

    print("Done")
