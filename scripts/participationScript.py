import random
from datetime import datetime

from faker import Faker


class Participation:

    def __init__(self, date, time, description, player_id, tournament_id):
        self.date = date
        self.time = time
        self.description = description
        self.player_id = player_id
        self.tournament_id = tournament_id


def generate_participation(amount):
    faker: Faker = Faker()
    participations = []

    for i in range(amount):

        date = faker.date()

        time = faker.time()
        description = faker.sentence()
        player_id = random.randint(1, 100_000)
        tournament_id = random.randint(1, 100_000)

        if i % 10000 == 0 and i > 0:
            print(f"Generated {i}")

        participations.append(Participation(date, time, description, player_id, tournament_id))

    return participations


def generate_participation_sql(participations):

    with open("participations.sql", "w") as file:
        file.write("truncate table \"tblChessParticipations\" restart identity cascade;")

    sql = "insert into \"tblChessParticipations\" (\"DateSigned\", \"DurationPlayed\", \"Description\", \"ChessPlayerID\", \"ChessTournamentID\") values "
    i = 0

    for party in participations:
        sql += f"('{party.date}', '{party.time}', '{party.description}', {party.player_id}, {party.tournament_id}),"
        if i % 100 == 0 and i != 0:
            with open("participations.sql", "a") as file:
                file.write(sql[:-1] + ";")

            print(f'Written {i} ')
            sql = "insert into \"tblChessParticipations\" (\"DateSigned\", \"DurationPlayed\", \"Description\", \"ChessPlayerID\", \"ChessTournamentID\") values "

        i += 1

    if sql != "insert into \"tblChessParticipations\" (\"DateSigned\", \"DurationPlayed\", \"Description\", \"ChessPlayerID\", \"ChessTournamentID\") values ":
        with open("participations.sql", "a") as file:
            file.write(sql[:-1] + ";")

    print("Done")
