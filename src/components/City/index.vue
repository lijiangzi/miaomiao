<template>
  <div class="city_body">
    <div class="city_list">
      <loading v-if="isLoading"/>
      <Scroller ref="city_list" v-else>
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="item in hotCity" :key="item.id" @tap='handleToCity(item.nm,item.id)'>{{item.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.id">
              <h2>{{item.index}}</h2>
              <ul>
                <li v-for="itemList in item.list" :key="itemList.id" @tap='handleToCity(itemList.nm,itemList.id)'>{{itemList.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in cityList"
          :key="item.index"
          @touchstart="handleToIndex(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { sign } from "crypto";
export default {
  name: "city",
  data() {
    return {
      cityList: "",
      hotCity: "",
      isLoading: true
    };
  },
  mounted() {
    var cityList = window.localStorage.getItem("cityList");
    var hotCity = window.localStorage.getItem("hotCity");
    

    if (cityList && hotCity) {
     
      this.cityList = JSON.parse(cityList);
      this.hotCity = JSON.parse(hotCity);
      this.isLoading = false;
    } else {
      this.axios.get("/api/cityList").then(res => {
        // console.log(res)
        var msg = res.data.msg;
        if (msg === "ok") {
          this.isLoading = true;
          var cities = res.data.data.cities;
          // console.log(cities);
          var { cityList, hotCity } = this.formatCityList(cities);
          this.cityList = cityList;
          this.hotCity = hotCity;
          window.localStorage.setItem("cityList", JSON.stringify(cityList));
          window.localStorage.setItem("hotCity", JSON.stringify(hotCity));
        }
      });
    }
  },
  methods: {
    formatCityList(cities) {
      var cityList = [];
      var hotCity = [];
      hotCity = cities.filter(function(ele) {
        return ele.isHot == 1;
      });
      cities.forEach(function(ele) {
        var nm = ele.nm;
        var id = ele.id;
        var lock = false;
        var firstLetter = ele.py.substring(0, 1).toUpperCase();
        cityList.forEach(function(ele) {
          if (ele.index == firstLetter) {
            lock = true;
          }
        });
        if (!lock) {
          cityList.push({
            index: firstLetter,
            list: [{ nm: ele.nm, id: ele.id }]
          });
        } else {
          cityList.forEach(function(ele, index) {
            if (ele.index == firstLetter) {
              ele.list.push({
                nm: nm,
                id: id
              });
            }
          });
        }
      });

      cityList.sort(function(c1, c2) {
        return c1.index > c2.index ? 1 : -1;
      });
      return { cityList, hotCity };
    },
    handleToIndex(index) {
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
    },
    handleToCity(nm,id){
      this.$store.commit('city/CITY_INFO',{nm,id});  //nm: nm缩写
      window/localStorage.setItem('nowNm',nm);
      window/localStorage.setItem('nowId',id);

      this.$router.push('/movie/nowPlaying')
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul {
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort {
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>