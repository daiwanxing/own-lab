module.exports = {
    "GET /api/user": function (req: any, res: any) {
        return res.json([
            {
              id: 1,
              username: "kenny",
              sex: 6
            }, {
              id: 2,
              username: "kenny",
              sex: 6
            }
          ]);
    }
};
