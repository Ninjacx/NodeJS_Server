function RRD(args){
  var arg = JSON.stringify(args);
  return JSON.parse(arg);
}

exports.RRD=RRD;
