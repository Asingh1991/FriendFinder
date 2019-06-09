
var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var possibleMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    var newFriend = req.body;
    var newFriendScores = newFriend.scores;

    var totalDifference;

    for (var i = 0; i < friends.length; i++) {
      var friendFromDB = friends[i];
      totalDifference = 0;

      console.log(friendFromDB.name);

      for (var j = 0; j < friendFromDB.scores.length; j++) {
        var friendFromDBScore = friendFromDB.scores[j];
        var currentFriendScore = newFriendScores[j];

        totalDifference += Math.abs(parseInt(currentFriendScore) - parseInt(friendFromDBScore));
      }

      if (totalDifference <= possibleMatch.friendDifference) {
        possibleMatch.name = friendFromDB.name;
        possibleMatch.photo = friendFromDB.photo;
        possibleMatch.friendDifference = totalDifference;
      }
    }


    friends.push(newFriend);

    res.json(possibleMatch);
  });
};
