import random
import bcrypt
from faker import Faker


class User:

    def __init__(self, password, username, bio, birth_date, phone_number, confirmation, active):
        self.password = password
        self.username = username
        self.bio = bio
        self.birth_date = birth_date
        self.phone_number = phone_number
        self.confirmation = confirmation
        self.active = active


def generate_users(amount):
    faker: Faker = Faker()
    users = []

    for i in range(amount):
        username = faker.user_name()
        phone = faker.phone_number()
        date = faker.date()
        bio = faker.sentence()
        confirmation = "arsenal"
        password = bcrypt.hashpw(username.encode('utf-8'), bcrypt.gensalt())
        active = True

        if i % 1000 == 0 and i > 0:
            print(f"Generated {i}")

        users.append(User(password, username, bio, date, phone, confirmation, active))

    return users


def generate_users_sql(users):

    with open("users.sql", "w") as file:
        file.write("truncate table \"tblUserProfiles\" restart identity cascade;")

    sql = "insert into \"tblUserProfiles\" (\"Password\", \"UserName\", \"Bio\", \"BirthDate\", \"PhoneNumber\", \"ConfirmationCode\", \"IsActive\") values "
    i = 0

    for user in users:
        sql += f"('{user.password}', '{user.username}', '{user.bio}', '{user.birth_date}', '{user.phone_number}', '{user.confirmation}', {user.active}),"
        if i % 100 == 0 and i != 0:
            with open("users.sql", "a") as file:
                file.write(sql[:-1] + ";")

            print(f'Written {i} ')
            sql = "insert into \"tblUserProfiles\" (\"Password\", \"UserName\", \"Bio\", \"BirthDate\", \"PhoneNumber\", \"ConfirmationCode\", \"IsActive\") values "

        i += 1

    if sql != "insert into \"tblUserProfiles\" (\"Password\", \"UserName\", \"Bio\", \"BirthDate\", \"PhoneNumber\", \"ConfirmationCode\", \"IsActive\") values ":
        with open("users.sql", "a") as file:
            file.write(sql[:-1] + ";")

    print("Done")
