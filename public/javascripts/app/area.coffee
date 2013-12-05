###
  used area
###

define [], ->

    places =
      tc:
        order:1
        id:"tc"
        text:"天朝"
        places :
          beijing:
            order:1
            name:"北京"
            places :
              haidian:
                order:1
                name:"海淀区"


          tianjin:
            order:2
            name:"天津"
          hebei:
            order:5
            name:"河北省"
            places :
              zhangjiakou:
                order:1
                name:"张家口"
                places :
                    yuxian:
                      order:1
                      name:"蔚县"




      others:
        order:"2"
        id:"others"
        text:"天朝之外"

