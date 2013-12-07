###
  used area
###

define [], ->

    places =
      tc:
        order:1
        id:"tc"
        text:"天朝"
        places:
          beijing:
            order:1
            id:'beijing'
            text:"北京"
            places :
              haidian:
                order:1
                name:"海淀区"


          tianjin:
            id:'tianjin'
            order:2
            text:"天津"
          hebei:
            order:5
            id:'hebei'
            text:"河北省"
            places :
              zhangjiakou:
                order:1
                id:"zhangjiakou"
                text:"张家口"
                places :
                    yuxian:
                      order:1
                      id:"yuxian"
                      text:"蔚县"
              shijiazhuang:
                order:1
                id:"shijiazhuang"
                text:"石家庄"
                places :
                  yuxian:
                    order:1
                    id:"hepingqu"
                    text:"和平区"




      others:
        order:"2"
        id:"others"
        text:"天朝之外"

