# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_a = User.create(name: "Vina")
user_b = User.create(name: "Roy")
user_c = User.create(name: "Anna")
user_d = User.create(name: "Adam")

advice_a = Advice.create(quote: "Don't stand for Bullshit.", user: user_d)
advice_b = Advice.create(quote: "You have the choice to do anything.", user: user_c)
advice_c = Advice.create(quote: "Be the best you can be bitch.", user: user_a)
advice_d = Advice.create(quote: "Be humble", user: user_b)
