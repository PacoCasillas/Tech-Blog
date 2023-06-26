const { Comment } = require("../models");

const commentData = [
    {
        commented_text: "This is a comment",
        commented_by: "Joker",
        user_id: 5,
        blogpost_id: 1,
        created_at: "2023-01-10"
    },
    {
        commented_text: "This is a comment",
        commented_by: "Joker",
        user_id: 5,
        blogpost_id: 2,
        created_at: "2023-01-10"
    },
    {
        commented_text: "This is a comment",
        commented_by: "Joker",
        user_id: 5,
        blogpost_id: 3,
        created_at: "2023-01-10"
    },
    {
        commented_text: "This is a comment",
        commented_by: "Joker",
        user_id: 5,
        blogpost_id: 4,
        created_at: "2023-01-10"
    },
    {
        commented_text: "This is a comment",
        commented_by: "Joker",
        user_id: 5,
        blogpost_id: 5,
        created_at: "2023-01-10"
    },
    {
        commented_text: "This is a comment about how funny I am",
        commented_by: "Joker",
        user_id: 5,
        blogpost_id: 1,
        created_at: "2023-01-10"
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;