async function seedDatabase() {
    await sequelize.sync({ force: true });

    // Seed users
    await URLSearchParams.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    console.log('Database seeded successfully');
    process.exit(0);
}

seedDatabase();