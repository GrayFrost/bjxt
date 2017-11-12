/**
 * Created by Administrator on 2017/4/3.
 */
import $ from 'jquery';
import {compare_API} from './api';
let jd_id = [];
let gm_id = [];
$.ajax({
  type: 'get',
  url: compare_API,
  dataType: 'jsonp',
  success: function (res){
    for(var i in res){
      jd_id.push(res[i].jd_id);
      gm_id.push(res[i].gm_id);
    }
  }
});

export {jd_id,gm_id};
