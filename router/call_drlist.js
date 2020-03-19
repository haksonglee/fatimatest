//const dataPath = __dirname + '/crawling/drlist.json'
//var fs = require('fs')

exports.call_drlist = function(deptname, drname, yedate, gubun) {

  //gubun 'sang'=> 상병, 'dept' => 진료과
  //deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  //var string = fs.readFileSync(dataPath, 'utf-8');
  //var data = JSON.parse(string)
  const data = require('./drlist.json')

  // for (var i = 0; i < data.length; i++) {
  //   var item = data[i];
  //   dept = item.dept
  //   item.title = item.title + '  ' + item.deptname
  //   if (item.deptname === '[' + deptname + ']' && drname === undefined) {
  //     body.push(item)
  //     //deptname_or_drname = true
  //   } else if (item.deptname === '[' + deptname + ']' && item.title === drname + '  ' + item.deptname){
  //     body.push(item)
  //   } else if (deptname === undefined && item.title === drname){
  //     body.push(item)
  //   } else if (gubun === 'sang' && item.description.indexOf(deptname) >= 0){
  //     body.push(item)
  //   }
  // };


  let quickbody = "[";
  let tempbody;
  var filterbody = data.filter(item => {
    return (item.deptname === '[' + deptname + ']' && (item.title === drname || drname === undefined)) ||
      (deptname === undefined && item.title === drname)
  })
  let dept = filterbody.dept

  var buttonstr;

  //console.log('deptname = ' + deptname)
  switch (deptname) {
    case '피부과':
    case '안과':
    case '비뇨의학과':
    case '정신건강의학과':
    case '재활의학과':
    case '치과':
      buttonstr = {
        label: "컨택센터 전화예약",
        action: "phone",
        phoneNumber: "055-270-1000"
      }
      texthelp = "해당 진료과는 전화예약만 가능합니다. 컨텍센터로 연락부탁드립니다."
      quickbody = "[{}]"
      break;

    default:
      buttonstr = {
        label: "모바일예약 이동",
        action: "webLink",
        webLinkUrl: "https://www.fatimahosp.co.kr/pages/department?deptdoctor=" + dept
      }
      texthelp = "진료를 원하시는 의료진을 선택하시면 예약페이지로 이동합니다."
      //console.log("filterbody.length", filterbody.length)
      for (let i = 0; i < filterbody.length; i++) {
        tempbody = `{ "label": "${filterbody[i].title}",
          "action": "message",
          "messageText": "${filterbody[i].title} 예약"
        }`
        //console.log("tempbody", typeof tempbody)
        if (i === filterbody.length - 1) {
          quickbody += tempbody
        } else {
          quickbody += tempbody + ','
        }
        //console.log("quickbody", quickbody)
      }

      quickbody = JSON.parse(quickbody + "]")

  }
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [{
          simpleText: {
            text: texthelp
          }
        },
        {
          listCard: {
            header: {
              title: "창원파티마병원 의료진",
              imageUrl: "https://www.fatimahosp.co.kr/assets/images/sub/sub_visual5.jpg"
            },
            items: filterbody,
            buttons: [{
                label: "다른 진료과 선택",
                action: "message",
                messageText: "진료예약"
              },
              buttonstr
            ]
          }
        }
      ],
      quickReplies: quickbody
    }
  }

  return responseBody
}
