module.exports = 
  { "development":
    { "driver":   "mongoose"
      ,"url":      "mongodb://localhost:27017/xiaodonggua"
    }
  , "staging":
      { "driver":   "mongoose"
          , "url":      "mongodb://localhost:27017/xiaodonggua"
      }
  , "test":
    { "driver":   "mongoose"
        , "url":      "mongodb://localhost:27017/xiaodonggua"
    }
  , "production":
    { "driver":   "mongoose"
        , "url":  "mongodb://soarpatriot:22143521@ds037837-a.mongolab.com:37837/xiaodonggua"

    }
  };
