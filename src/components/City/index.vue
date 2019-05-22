<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="item in hotCity" :key="item.id">{{item.nm}}</li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="item in cityList" :key="item.id">
          <h2>{{item.index}}</h2>
          <ul>
            <li v-for="itemList in item.list" :key="itemList.id">{{itemList.nm}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { sign } from 'crypto';
export default {
  name: "city",
  data(){
    return {
       cityList:'',
       hotCity:''
    }
  },
  mounted(){
    this.axios.get('/api/cityList').then((res)=>{
      // console.log(res)
      var msg = res.data.msg;
      if(msg === 'ok'){
        var cities = res.data.data.cities;
        // console.log(cities);
        var {cityList,hotCity} = this.formatCityList(cities);
        this.cityList = cityList;
        this.hotCity = hotCity
        
      }
    })
  },
  methods: {
    formatCityList(cities){
      var cityList = [];
      var hotCity = [];
      hotCity = cities.filter(function(ele){
        return ele.isHot == 1
      })
      cities.forEach(function(ele){
        
        var nm = ele.nm;
        var id = ele.id;
        var lock =false;
        var firstLetter = ele.py.substring(0,1).toUpperCase();
        cityList.forEach(function(ele){
        if(ele.index == firstLetter){
          lock = true
        }
      })
        if(!lock){
          cityList.push({
            index: firstLetter,
            list: [
              {nm:ele.nm,id:ele.id},   
            ]
          })
        }else{
          cityList.forEach(function(ele,index){
            if(ele.index == firstLetter){
              ele.list.push({
                nm:nm,
                id:id
              })
            }
          })
        }
      })

      cityList.sort(function(c1,c2){
        return c1.index>c2.index ? 1 : -1
      })
      return {cityList,hotCity}
    },
    handleToIndex(index){
      var h2 = this.$refs.city_sort.getElementsByTagName('h2');
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
    }
  } 
};
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

</style>