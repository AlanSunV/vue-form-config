<template>
  <div>
    <el-date-picker
      v-model="timeInterval"
      style="float: left;"
      size="large"
      :type="type"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :clearable="clearable"
      :default-time="defaultTime"
      :picker-options="pickerOptions"
      @change="onChage"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import * as g from "@/libs/global";

export default {
  components: {},
  props: {
    type: {
      type: String,
      default: "daterange"
    },
    ruleForm: Object,
    formItem: Object,
    pickerOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    clearable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isRest: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      defaultTime: [],
      timeInterval: "",
      dateList: [
        {
          label: "昨天",
          value: 1
        },
        {
          label: "近3天",
          value: 3
        },
        {
          label: "近7天",
          value: 7
        },
        {
          label: "近30天",
          value: 30
        }
      ],
      selectItem: {
        label: "近7天",
        value: 7
      }
    };
  },
  watch: {
    isRest: function($new) {
      if ($new) {
        if (this.formItem.isSelectToday) {
          this.dateList[0].label = "今天";
        }

        if (this.type === "datetimerange") {
          this.defaultTime = ["00:00:00", "23:59:59"];
        }
        this.onClick_item(this.dateList[0]);
      }
    }
  },
  created() {
    if (this.formItem.isSelectToday) {
      this.dateList[0].label = "今天";
    }

    if (this.type === "datetimerange") {
      this.defaultTime = ["00:00:00", "23:59:59"];
    }
    this.onClick_item(this.dateList[0]);
  },
  methods: {
    onChage($data) {
      if ($data === null) {
        this.onClick_item(this.dateList[0]);
        return;
      }
      this.selectItem = {};
      let timeArr = [];
      if (this.type === "daterange") {
        timeArr = [g.utils.date($data[0]), g.utils.date($data[1])];
      } else if (this.type === "datetimerange") {
        timeArr = [g.utils.time($data[0]), g.utils.time($data[1])];
      }

      this.$emit("dataSelect", timeArr);
      this.ruleForm[this.formItem.key] = timeArr;
    },
    onClick_item($item) {
      this.selectItem = $item;
      if (this.type === "daterange") {
        let start = "";
        let end = "";
        if ($item.label === "今天") {
          end = this.getDay(0);
          start = this.getDay(-$item.value + 1);
        } else {
          end = this.getDay(-1);
          start = this.getDay(-$item.value);
        }
        this.timeInterval = [start, end];
      } else if (this.type === "datetimerange") {
        let start = "";
        let end = "";
        if ($item.label === "今天") {
          end = this.getDay(0) + " 23:59:59";
          start = this.getDay(-($item.value - 1)) + " 00:00:00";
        } else {
          end = this.getDay(-1) + " 23:59:59";
          start = this.getDay(-$item.value) + " 00:00:00";
        }
        this.timeInterval = [start, end];
      }

      this.$emit("dataSelect", this.timeInterval);
      this.ruleForm[this.formItem.key] = this.timeInterval;
    },
    getDay(day) {
      var today = new Date();
      const targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    getTime(day) {
      var today = new Date();
      const targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      var tHour = today.getHours();
      var tMinute = today.getMinutes();
      var tsecond = today.getSeconds();

      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      tHour = this.doHandleMonth(tHour);
      tMinute = this.doHandleMonth(tMinute);
      tsecond = this.doHandleMonth(tsecond);
      return (
        tYear +
        "-" +
        tMonth +
        "-" +
        tDate +
        " " +
        tHour +
        ":" +
        tMinute +
        ":" +
        tsecond
      );
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length === 1) {
        m = "0" + month;
      }
      return m;
    }
  }
};
</script>
<style type="text/css" lang="scss" rel="stylesheet/scss" scoped>
.date-item {
  float: left;
  height: 40px;
  width: 77px;
  //   padding: 5px;
  margin-left: 15px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #b0b2b8;
  cursor: pointer;
  -moz-user-select: none; /* 火狐 */
  -webkit-user-select: none; /* webkit浏览器 */
  -ms-user-select: none; /* IE10 */
  -khtml-user-select: none; /* 早期浏览器 */
  user-select: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.select {
  color: #409eff;
  border: 1px solid #409eff;
}
</style>
