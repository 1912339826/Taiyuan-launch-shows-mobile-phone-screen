if (process.env.NODE_ENV == "development") {
  // 开发
  // var BASE_URLA = "http://192.168.1.55:9081";
  var BASE_URLA = "http://192.168.1.55:9081"
  // localStorage.setItem("BASE_URLA", BASE_URLA);
} else if (process.env.NODE_ENV == "debug") {
  // debug
  var BASE_URLA = "http://192.168.1.55:9081";
  // localStorage.setItem("BASE_URLA", BASE_URLA);
} else if (process.env.NODE_ENV == "production") {
  // 生产
  var BASE_URLA = "http://172.1.0.130:9081";
  // var BASE_URLA = "http://192.168.1.55:9081";
  // localStorage.setItem("BASE_URLA", BASE_URLA);
  
}
window.BASE_URLA = BASE_URLA;
export default {
  baseUrl: BASE_URLA,
  BASE_URLA,
  Login: `${BASE_URLA}/ark/login.do`,
  // 2.首页-通知公告
  getInformAndNoticeList: `${BASE_URLA}/jsxlplat/defaultpage/datastatics/getInformAndNoticeList.do`,
  // 3.首页-战备值班
  showDutyManage: `${BASE_URLA}/jsxlplat/defaultpage/datastatics/showDutyManage.do`,
  // 4.首页-今日工作
  getPlanWeekCount: `${BASE_URLA}/secplat/pagePlanRemind/getPlanWeekCount.do`,
  // 5.首页-训练进度
  trainScheduleContrast: `${BASE_URLA}/jsxlplat/defaultpage/datastatics/trainScheduleContrast.do`,
  // 1.战备工作-部门导航
  getOrgTreePublic: `${BASE_URLA}/secplat/sys/organization/getOrgTreePublic.do`,
  // 2.战备工作-通信值勤-获取本月有几周
  getWeekByMonth: `${BASE_URLA}/jsxlpost/dutymanagement/postWatch/zbPostDuty/getWeekByMonth.do`,
  // 3.战备工作-获取周值班数据 ------------------
  getSrTecResultData: `POST ${BASE_URLA}/jsxlpost/dutymanagement/postWatch/zbPostDuty/getSrTecResultData.do`,
  // 1.政治工作-党委结构图
  zzgzMngOrgBuild: `${BASE_URLA}/zzgz/zzgzMngOrgCons/zzgzMngOrgBuild/zzorg/listTree.do`,
  // 2.政治工作-月教育计划
  getMonthEduRecordList: `${BASE_URLA}/armyplat/fl/queryIndex/getMonthEduRecordList.do`,
  // 3.政治工作-教育类型次数统计饼图
  getEduTypeCountChar: `${BASE_URLA}/armyplat/fl/queryIndex/getEduTypeCountChar.do`,
  // 1.日常管理-人员在位率柱状图
  perReignCount: `${BASE_URLA}/jsxlplat/trainPlanIndex/trainPlan/perReignCount.do`,
  // 2.日常管理-人员在位数/在位率
  getTodayReginNum: `${BASE_URLA}/jsxlplat/trainPlanIndex/trainPlan/getTodayReginNum.do`,
  // 3.日常管理-车辆在位/不在位列表
  getCarList: `${BASE_URLA}/secplat/carmanager/carinout/getCarList.do`,
  // 4.日常管理-车辆在位数/外出数
  getPublicCarChangeRecord: `${BASE_URLA}/jsxlplat/trainPlanIndex/trainPlan/getPublicCarChangeRecord.do`,
  // 5.日常管理-家属房入住情况
  getTempHomeInfo: `${BASE_URLA}/armyplat/fl/queryIndex/getTempHomeInfo.do`,
  // 6.日常管理-今日访客情况
  getVisitRecord: `${BASE_URLA}/jsxlplat/trainPlanIndex/trainPlan/getVisitRecord.do`,
  // 1.工作计划-每日工作
  getThisWeekWorkInfo: `${BASE_URLA}/armyplat/fl/queryIndex/getThisWeekWorkInfo.do`,
  // 1.本周食谱
  getThisWeekFoodMenu: `${BASE_URLA}/armyplat/fl/queryIndex/getThisWeekFoodMenu.do`,
  // 1.通知公告列表-分页
  getNoticePage: `${BASE_URLA}/armyplat/fl/queryIndex/getNoticePage.do`,
  // 2.通知公告列表-详情
  commonupload: `${BASE_URLA}/jsxlplat/commonupload/list.do`,
  // 1.建言建议-获取意见类型字典
  list_category_value2: `${BASE_URLA}/ark/plat/sysset/category/list_category_value2.do`,
  // 2.建言建议-保存意见
  save: `POST ${BASE_URLA}/secplat/basework/suggestbox/save.do`,
  // 3.建言建议-获取意见列表-分页
  getSuggestPage: `${BASE_URLA}/armyplat/fl/queryIndex/getSuggestPage.do`,
  // 军事训练
  // 1.训练进度
  trainScheduleContrast: `${BASE_URLA}/jsxlplat/defaultpage/datastatics/trainScheduleContrast.do`,
  //  2.参训率
  // 周
  showTrainRateByOrg: `${BASE_URLA}/jsxlplat/defaultpage/datastatics/showTrainRateByOrg.do`,
  // 月
  showTrainRateByOneMonth: `${BASE_URLA}/jsxlplat/defaultpage/datastatics/showTrainRateByOneMonth.do`,
  // 年
  showTrainRateByRecentYear: `${BASE_URLA}/jsxlplat/defaultpage/datastatics/showTrainRateByRecentYear.do`,
  // 3.岗位分布
  showPostList: `${BASE_URLA}/jsxlplat/defaultpage/datastatics/showPostList.do`,
  // 1.团长信箱
  bwleadersuggest: `${BASE_URLA}/secplat/basework/bwleadersuggest/save.do`,
   // 2.政委信箱
   bwpoliticalsuggest: `${BASE_URLA}/secplat/basework/bwpoliticalsuggest/save.do`,
   //1.举报信箱
   bwjdcsuggest: `${BASE_URLA}/secplat/basework/bwjdcsuggest/save.do`,
  // 人脸补录
  // updatePersonImg: `POST ${BASE_URLA}/faceplat/facePersonImg/updatePersonImg.do`
};
