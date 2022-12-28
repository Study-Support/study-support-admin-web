<template>
  <div class="wrap">
    <!-- <div class="container1">
      <div class="content">
        <div class="cards">
          <v-row>
            <v-col cols="12" lg="3" sm="12" md="6">
              <div class="card">
                <div class="icon-case">
                  <v-icon style="font-size: 70px; color: #009cff"
                    >mdi-account-school-outline</v-icon
                  >
                </div>
                <div class="box">
                  <h2>3</h2>
                  <h3>Sinh Viên</h3>
                </div>
              </div>
            </v-col>
            <v-col cols="12" lg="3" sm="12" md="6">
              <div class="card">
                <div class="icon-case">
                  <v-icon style="font-size: 70px; color: #009cff"
                    >mdi-human-male-board-poll</v-icon
                  >
                </div>
                <div class="box">
                  <h2>53</h2>
                  <h3>Mentor</h3>
                </div>
              </div>
            </v-col>
            <v-col cols="12" lg="3" sm="12" md="6">
              <div class="card">
                <div class="icon-case">
                  <v-icon style="font-size: 70px; color: #009cff"
                    >mdi-account-group-outline</v-icon
                  >
                </div>
                <div class="box">
                  <h2>5</h2>
                  <h3>Nhóm học</h3>
                </div>
              </div>
            </v-col>
            <v-col cols="12" lg="3" sm="12" md="6">
              <div class="card">
                <div class="icon-case">
                  <v-icon style="font-size: 70px; color: #009cff"
                    >mdi-bell-ring-outline</v-icon
                  >
                </div>
                <div class="box">
                  <h2>13</h2>
                  <h3>Thông báo</h3>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div> -->
    <v-row>
      <v-col lg="8" md="12">
        <DxPieChart
          id="pie"
          :data-source="populationByRegions"
          type="doughnut"
          title="Thống kê nhóm học"
          palette="Soft Pastel"
          class="BoxBasic"
        >
          <DxSeries argument-field="region">
            <DxLabel :visible="true">
              <DxConnector :visible="true" />
            </DxLabel>
          </DxSeries>
          <DxExport :enabled="true" />
          <DxLegend
            :margin="0"
            horizontal-alignment="right"
            vertical-alignment="top"
          />
          <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip">
          </DxTooltip>
        </DxPieChart>
      </v-col>
      <v-col lg="4" md="6">
        <div class="new-students">
          <div class="titleBox">
            <div class="title">
              <h2 style="padding-right: 20px">Nhóm học</h2>
              <NuxtLink :to="{ path: `/groups` }" class="btn">View</NuxtLink>
            </div>
            <div class="icon-case" style="padding-top: 20px">
              <h5>Tổng số nhóm học</h5>
              <div
                class="box"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding-top: 20px;
                "
              >
                <v-icon style="font-size: 70px; color: #009cff"
                  >mdi-account-group-outline</v-icon
                >
                <h1>31</h1>
              </div>
            </div>
          </div>
          <v-list density="compact">
            <v-list-subheader>Thống kê trạng thái nhóm học</v-list-subheader>

            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              active-color="primary"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" color="#009cff"></v-icon>
              </template>

              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 100%;
                "
              >
                <v-list-item-title
                  v-text="item.text"
                  style="padding-left: 10px"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-text="item.data"
                  style="color: #000"
                ></v-list-item-subtitle>
              </div>
            </v-list-item>
          </v-list>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="4">
        <div
          class="BoxBasic"
          style="
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          "
        >
          <h4 style="color: #009cff; padding-top: 20px">Thống kê thông báo</h4>
          <div class="icon-case" style="padding-top: 20px">
            <h5>Tổng số thông báo</h5>
            <div
              class="box"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 20px;
              "
            >
              <v-icon style="font-size: 70px; color: #009cff"
                >mdi-bell-ring-outline</v-icon
              >
              <h1>30</h1>
            </div>
          </div>
          <div class="icon-case" style="padding-top: 50px">
            <h5>Số câu hỏi mentor</h5>
            <div
              class="box"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 20px;
              "
            >
              <v-icon style="font-size: 70px; color: #009cff"
                >mdi-account-question-outline</v-icon
              >
              <h1>3</h1>
            </div>
          </div>
        </div>
      </v-col>
      <v-col sm="4">
        <DxPieChart
          id="pie"
          :data-source="areas"
          palette="Bright"
          title="Area of Countries"
          @point-click="pointClickHandler($event)"
          @legend-click="legendClickHandler($event)"
          class="BoxBasic"
        >
          <DxSeries argument-field="country" value-field="area">
            <DxLabel :visible="true">
              <DxConnector :visible="true" :width="1" />
            </DxLabel>
          </DxSeries>
          <DxExport :enabled="true" />
          <DxLegend
            vertical-alignment="bottom"
            horizontal-alignment="center"
            item-text-position="right"
          />
        </DxPieChart>
      </v-col>
      <v-col sm="4">
        <DxPieChart
          id="pie"
          :data-source="areas1"
          palette="Bright"
          title="Area of Countries"
          @point-click="pointClickHandler($event)"
          @legend-click="legendClickHandler($event)"
          class="BoxBasic"
        >
          <DxSeries argument-field="country" value-field="area">
            <DxLabel :visible="true">
              <DxConnector :visible="true" :width="1" />
            </DxLabel>
          </DxSeries>
          <DxExport :enabled="true" />
          <DxLegend
            vertical-alignment="bottom"
            horizontal-alignment="center"
            item-text-position="right"
          />
        </DxPieChart>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="8">
        <DxChart
          id="chart"
          :data-source="sharingStatisticsInfo"
          palette="Violet"
          title="Architecture Share Over Time (Count)"
          class="BoxBasic"
        >
          <DxCommonSeriesSettings :type="type" argument-field="month" />
          <DxCommonAxisSettings>
            <DxGrid :visible="true" />
          </DxCommonAxisSettings>
          <DxSeries
            v-for="architecture in architectureSources"
            :key="architecture.value"
            :value-field="architecture.value"
            :name="architecture.name"
          />
          <DxMargin :bottom="20" />
          <DxArgumentAxis :allow-decimals="false" :axis-division-factor="60">
            <DxLabel>
              <DxFormat type="decimal" />
            </DxLabel>
          </DxArgumentAxis>
          <DxLegend vertical-alignment="top" horizontal-alignment="right" />
          <DxExport :enabled="true" />
          <DxTooltip :enabled="true" />
        </DxChart>
      </v-col>
      <v-col lg="4">
        <div
          class="BoxBasic"
          style="
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          "
        >
          <h4 style="color: #009cff; padding-top: 20px">Thống kê người dùng</h4>
          <div class="icon-case" style="padding-top: 20px">
            <h5>Tổng số sinh viên</h5>
            <div
              class="box"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 20px;
              "
            >
              <v-icon style="font-size: 70px; color: #009cff"
                >mdi-account-school-outline</v-icon
              >
              <h1>500</h1>
            </div>
          </div>
          <div class="icon-case" style="padding-top: 50px">
            <h5>Tổng số Mentor</h5>
            <div
              class="box"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 20px;
              "
            >
              <v-icon style="font-size: 70px; color: #009cff">
                mdi-human-male-board-poll</v-icon
              >
              <h1>50</h1>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import DxPieChart, {
  DxLegend,
  DxSeries,
  DxTooltip,
  DxLabel,
  DxConnector,
  DxExport,
} from "devextreme-vue/pie-chart";
import {
  DxChart,
  DxCommonSeriesSettings,
  DxArgumentAxis,
  DxCommonAxisSettings,
  DxGrid,
  DxMargin,
  DxFormat,
} from "devextreme-vue/chart";

definePageMeta({
  layout: "default",
  middleware: "authenticated",
});

const architectureSources = ref([
  { value: "user", name: "User" },
  { value: "mentor", name: "Mentor" },
]);

const sharingStatisticsInfo = ref([
  {
    month: "9 / 2022",
    user: 0,
    mentor: 0,
  },
  {
    month: " 11 / 2022",
    user: 61,
    mentor: 7,
  },
  {
    month: "1 / 2023",
    user: 157,
    mentor: 23,
  },
  {
    month: "3 / 2023",
    user: 283,
    mentor: 40,
  },
  {
    month: "5 / 2023",
    user: 416,
    mentor: 78,
  },
  {
    month: "7 / 2023",
    user: 678,
    mentor: 100,
  },
]);

const items = ref([
  { text: "Đang chờ duyệt", icon: "mdi-clock", data: "10" },
  { text: "Tìm kiếm member", icon: "mdi-account-badge", data: "8" },
  { text: "Tìm kiếm mentor", icon: "mdi-account-school", data: "5" },
  { text: "Đang hoạt động", icon: "mdi-access-point", data: "7" },
  { text: "Đã đóng", icon: "mdi-doorbell-video", data: "1" },
]);
const areas = ref([
  {
    country: "Chờ duyệt",
    area: 12,
  },
  {
    country: "Tìm kiếm member",
    area: 7,
  },
]);
const areas1 = ref([
  {
    country: "Tìm kiếm mentor",
    area: 3,
  },
  {
    country: "Đang hoạt động",
    area: 5,
  },
]);
const populationByRegions = ref([
  {
    region: "Chờ duyệt",
    val: 10,
  },
  {
    region: "Tìm kiếm member",
    val: 8,
  },
  {
    region: "Tìm kiếm mentor",
    val: 5,
  },
  {
    region: "Đang hoạt động",
    val: 7,
  },
  {
    region: "Đã Đóng",
    val: 1,
  },
]);

const customizeTooltip = ({ valueText, percent }) => {
  return {
    text: `${valueText} - ${(percent * 100).toFixed(2)}%`,
  };
};
const pointClickHandler = (e) => {
  toggleVisibility(e.target);
};
const legendClickHandler = (e) => {
  const arg = e.target;
  const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
  toggleVisibility(item);
};
const toggleVisibility = (item) => {
  item.isVisible() ? item.hide() : item.show();
};
</script>

<style scoped>
.BoxBasic {
  background-color: #fff;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  border-radius: 5px;
}
#chart {
  height: 440px;
}
#pie {
  height: 440px;
}
a {
  text-decoration: none;
}

li {
  list-style: none;
}

h1,
h2 {
  color: #444;
}
h2 {
  text-align: center;
}
h3 {
  color: #999;
}
h5 {
  color: #999;
}
.wrap {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.btn {
  background: #009cff;
  color: white;
  padding: 5px 10px;
  text-align: center;
}

.btn:hover {
  color: #009cff;
  background: white;
  padding: 3px 8px;
  border: 2px solid #009cff;
}
.img-cus {
  width: 65px;
  height: 50px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px 10px;
  border-bottom: 2px solid #999;
}

table {
  padding: 10px;
}

th,
td {
  text-align: left;
  padding: 8px;
}
.container1 {
  width: 100%;
  /* background: #f1f1f1; */
}

.content {
  position: relative;
  /* background: #f1f1f1; */
}

.cards {
  padding: 20px 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  background: white;
  display: flex;
  flex-direction: row;
  min-height: 160px;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}

.content-2 {
  min-height: 60vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
}

.recent-payments {
  min-height: 50vh;
  flex: 5;
  background: white;
  margin: 0 25px 25px 25px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  display: flex;
  flex-direction: column;
}

.new-students {
  background: white;
  height: 100%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
.titleBox {
  display: flex;
  align-items: center;
  flex-direction: column;
}

table td:nth-child(1) img {
  height: 40px;
  width: 40px;
}

@media screen and (max-width: 536px) {
  h1 {
    font-size: 16px;
  }
  .cards {
    justify-content: center;
  }
  .side-menu li img {
    width: 30px;
    height: 30px;
  }
  .container1 .content .content-2 .recent-payments table th:nth-child(2),
  .container1 .content .content-2 .recent-payments table td:nth-child(2) {
    display: none;
  }
}
</style>
