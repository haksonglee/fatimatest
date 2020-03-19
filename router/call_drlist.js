//const dataPath = __dirname + '/crawling/drlist.json'
//var fs = require('fs')

exports.call_drlist = function(deptname, drname, yedate, gubun) {

 //gubun 'sang'=> 상병, 'dept' => 진료과
  //deptname = params['진료과명'] //시나리오 필수파라미터 이름 동일해야함
  //var string = fs.readFileSync(dataPath, 'utf-8');
  //var data = JSON.parse(string)
  const data   = require('./drlist.json')

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
      break;

    default:
      buttonstr = {
        label: "모바일예약 이동",
        action: "webLink",
        webLinkUrl: "https://www.fatimahosp.co.kr/pages/department?deptdoctor=" + dept
      }

  }
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [{
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
      }],
      quickReplies: [{
        "label": "소아청소년과",
        "action": "message",
        "messageText": "소아청소년과 예약"
      }]
    }
  }

  return responseBody
}
