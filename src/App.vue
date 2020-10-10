<template>
  <div id="app" class="container">
    <!--search-->
    <div class="row justify-content-center">
      <div class="col">
        <nav class="navbar navbar-light bg-light justify-content-between">
          <a class="navbar-brand col" href="" @click.prevent title="全网音乐聚合搜索">Music-Box</a>
          <input
            v-focus
            @keyup.enter="wangyiSearch"
            @blur="wangyiSearch"
            v-model="query"
            class="form-control mr-sm-2 col"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            @click="wangyiSearch"
            class="btn btn-outline-success my-2 my-sm-0"
            type="button"
          >
            Search
          </button>
        </nav>
      </div>
    </div>
    <!--search-->

    <!--qserach-->
    <!-- <div v-if="true" class="row">
        <div @click="quickSearch('恋爱循环')" class="col btn">恋爱循环</div>
        <div @click="quickSearch('星辰大海')" class="col btn">星辰大海</div>
        <div @click="quickSearch('我们的歌')" class="col btn">我们的歌</div>
        <div @click="quickSearch('同桌的你')" class="col btn">同桌的你</div>
    </div> -->
    <!--qserach-->
    
    <!--musicList-->
    <div class="row mt-4" style="height: 75vh">
        <div class="col">
            <nav>
              <div class="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                <a @click="searchList(0)" class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#wangyi" role="tab" aria-controls="nav-home" aria-selected="true">网易云音乐</a>
                <a @click="searchList(1)" class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#qq" role="tab" aria-controls="nav-profile" aria-selected="false">QQ音乐</a>
                <a @click="searchList(2)" class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#kugou" role="tab" aria-controls="nav-contact" aria-selected="false">酷狗音乐</a>
                <a @click="searchList(3)" class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#kuwo" role="tab" aria-controls="nav-contact" aria-selected="false">酷我音乐</a>
                <a @click="searchList(4)" class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#migu" role="tab" aria-controls="nav-contact" aria-selected="false">咪咕音乐</a>
                <a @click="searchList(5)" class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#baidu" role="tab" aria-controls="nav-contact" aria-selected="false">百度音乐</a>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <!--wangyiList-->
              <div class="tab-pane fade show active" id="wangyi" role="tabpanel" aria-labelledby="nav-home-tab">
                <table class="table table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">歌名</th>
                      <th scope="col">歌手</th>
                      <th scope="col">专辑</th>
                      <th scope="col">时长</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in musicList[0]" :key="index">
                      <th scope="row">{{index++}}</th>
                      <td class="text-truncate" style="max-width: 120px;">
                        <a @click="wangyiMusicPlay(item.id)" style="cursor:pointer" :title="item.name">{{item.name}}</a>
                        <!-- Button trigger modal -->
                        <a v-if="item.mvid!=0" @click.prevent="wangyiMvPlay(item.mvid,item.name)"
                            class="badge badge-pill badge-primary" data-toggle="modal" href=""
                            data-target="#video">
                            MV
                        </a>
                        <!-- Button trigger modal -->
                      </td>
                      <td>{{item.artists[0].name}}</td>
                      <td class="text-truncate" style="max-width: 120px;" :title="item.album.name">{{item.album.name}}</td>
                      <td>{{wangyiDuration(item.duration)}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--wangyiList-->

              <!--qqList-->
              <div class="tab-pane fade" id="qq" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div v-show="isShwoTips" class="text-center">{{tips}}</div>
                <table class="table table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">歌名</th>
                      <th scope="col">歌手</th>
                      <th scope="col">专辑</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in musicList[1]" :key="index">
                      <th scope="row">{{index++}}</th>
                      <td class="text-truncate" style="max-width: 120px;">
                        <a @click="qqMusicPlay(item.songmid)" style="cursor:pointer" :title="item.songname">{{item.songname}}</a>
                      </td>
                      <td>{{item.singer.name}}</td>
                      <td :title="item.albumname" class="text-truncate" style="max-width: 120px;">{{item.albumname}}</td>
                    </tr>
                  </tbody>
                </table>                
              </div>
              <!--qqList-->

              <!--kugouList-->
              <div class="tab-pane fade" id="kugou" role="tabpanel" aria-labelledby="nav-contact-tab">
                <table class="table table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">歌名</th>
                      <th scope="col">歌手</th>
                      <th scope="col">专辑</th>
                      <th scope="col">时长</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in musicList[2]" :key="index">
                      <th scope="row">{{index++}}</th>
                      <td class="text-truncate" style="max-width: 120px;">
                        <a @click="kugouMusicPlay(item.hash)" style="cursor:pointer" :title="item.songname">{{item.songname}}</a>
                        <!-- Button trigger modal -->
                        <a v-if="item.mvhash!=0" @click.prevent="kugouMvPlay(item.mvhash,item.songname)"
                            class="badge badge-pill badge-primary" data-toggle="modal" href=""
                            data-target="#video">
                            MV
                        </a>
                        <!-- Button trigger modal -->
                      </td>
                      <td>{{item.singername}}</td>
                      <td class="text-truncate" style="max-width: 120px;" :title="item.album_name">{{item.album_name}}</td>
                      <td>{{kugouDuration(item.duration)}}</td>
                    </tr>
                  </tbody>
                </table>    
              </div>
              <!--kugouList-->

              <!--kuwoList-->
              <div class="tab-pane fade" id="kuwo" role="tabpanel" aria-labelledby="nav-contact-tab">
                <table class="table table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">歌名</th>
                      <th scope="col">歌手</th>
                      <th scope="col">专辑</th>
                      <th scope="col">时长</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in musicList[3]" :key="index">
                      <th scope="row">{{index++}}</th>
                      <td class="text-truncate" style="max-width: 120px;">
                        <a @click="kuwoMusicPlay(item.MUSICRID)" style="cursor:pointer" :title="item.SONGNAME">{{item.SONGNAME}}</a>
                      </td>
                      <td>{{item.ARTIST}}</td>
                      <td class="text-truncate" style="max-width: 120px;" :title="item.ALBUM">{{item.ALBUM}}</td>
                      <td>{{kuwoDuration(item.DURATION)}}</td>
                    </tr>
                  </tbody>
                </table>  
              </div>
              <!--kuwoList-->

              <!--miguList-->
              <div class="tab-pane fade" id="migu" role="tabpanel" aria-labelledby="nav-contact-tab">
                <table class="table table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">歌名</th>
                      <th scope="col">歌手</th>
                      <th scope="col">专辑</th>
                      <!-- <th scope="col">时长</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in musicList[4]" :key="index">
                      <th scope="row">{{index++}}</th>
                      <td class="text-truncate" style="max-width: 120px;">
                        <a @click="miguMusicPlay(item.mp3)" style="cursor:pointer" :title="item.songName">{{item.songName}}</a>
                      </td>
                      <td>{{item.singerName}}</td>
                      <td class="text-truncate" style="max-width: 120px;" :title="item.albumName">{{item.albumName}}</td>
                      <!-- <td>{{kugouDuration(item.duration)}}</td> -->
                    </tr>
                  </tbody>
                </table>    
              </div>
              <!--miguList-->
              
              <!--baiduList-->
              <div class="tab-pane fade" id="baidu" role="tabpanel" aria-labelledby="nav-contact-tab">
                <table class="table table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">歌名</th>
                      <th scope="col">歌手</th>
                      <th scope="col">专辑</th>
                      <th scope="col">时长</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in musicList[5]" :key="index">
                      <th scope="row">{{index++}}</th>
                      <td class="text-truncate" style="max-width: 120px;">
                        <a @click="baiduMusicPlay(item.song_id)" style="cursor:pointer" :title="item.title">{{item.title}}</a>
                      </td>
                      <td>{{item.author}}</td>
                      <td class="text-truncate" style="max-width: 120px;" :title="item.album_title">{{item.album_title}}</td>
                      <td>{{kugouDuration(item.file_duration)}}</td>
                    </tr>
                  </tbody>
                </table>    
              </div>
              <!--baiduList-->
              
            </div>

        </div>
    </div>
    <!--musicList-->

    <!--audio-->
    <div class="row">
        <audio v-show="true" ref="audio" @play="musicPlayControl(1)" @pause="musicPlayControl(0)" :src="musicUrl" class="col" controls autoplay loop></audio>
    </div>
    <!--audio-->

    <!--video-->
    <div class="modal fade bd-example-modal-lg" id="video" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{videoname}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span @click="mvPlayControl(1)" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body row">
                    <!--video-->
                    <video ref="video" class="col" controls loop autoplay :src="mvUrl">
                    </video>
                    <!--video-->
                </div>
                <div class="modal-footer">
                    <button @click="mvPlayControl(1)" type="button" class="btn btn-secondary"
                        data-dismiss="modal">关闭</button>
                    <button @click="mvPlayControl(0)" type="button"
                        class="btn btn-primary">{{palyorpause?'播放':'暂停'}}</button>
                </div>
            </div>
        </div>
    </div>
    <!--video-Modal-->

  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import HelloWorld from './components/HelloWorld.vue'

export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  computed:{
    wangyiDuration:function(){
        return function(time){
          var a = time/1000
          var b = parseInt(a/60).toString().padStart(2,'0')
          var c = Math.round(a%60).toString().padStart(2,'0')
          return b+':'+c
        }
    },
    kugouDuration:function(){
        return function(time){
          var b = parseInt(time/60).toString().padStart(2,'0')
          var c = Math.round(time%60).toString().padStart(2,'0')
          return b+':'+c
        }
    },    
    kuwoDuration:function(){
      return function(time){
        return this.kugouDuration(time)
      }
    },
    counter:function(){
      return function(id){
        return id.toString().padStart(2,'0')
      }
    }
  },
  name: "App",
  components: {
    //VideoPlayer
  },
  data: function () {
    return {
      query: "遇见",
      musicUrl: "",
      mvUrl: "",
      musicList: [
        [],
        [],
        [],
        [],
        [],
        []
      ],
      siteList: ["网易云音乐", "QQ音乐", "酷狗音乐", "酷我音乐", "咪咕音乐", "百度音乐"],
      isAudioShow:false,
      showActive: false,
      palyorpause: false,
      audioPlayorPause: false,
      videoname: "",
      tips:"正在加载...",
      isShwoTips:false
    };
  },
  methods: {
    searchList:function(index){
      switch(index){
        case 0:
          this.wangyiSearch()
          break
        case 1:
          this.qqSearch()
          break
        case 2:
          this.kugouSearch()
          break
        case 3:
          this.kuwoSearch()
          break
        case 4:
          this.miguSearch()
          break
        case 5:
          this.baiduSearch()
          break
      }
    },
    quickSearch:function(name){
      this.query=name
      this.wangyiSearch()
    },
    wangyiSearch: function () {
      var that = this;
      this.$axios
        .get("/wangyi/search", {
          params: {
            keywords: this.query,
            limit:10
          },
        })
        .then(
          function (res) {
            that.musicList.splice(0, 1, res.data.result.songs);
          },
          function (err) {
            console.log(err);
          }
        );
    },
    qqSearch: function () {
      var that=this
      this.$axios
        .get("/qq/music/list", {
          params: {
            w: this.query,
            p:1,
            n:10
          },
        })
        .then(
          function (res) {
            that.musicList.splice(1, 1, res.data.data.list);
            console.log(res)
          },
          function (err) {
            console.log(err);
          }
        );
    },
    kugouSearch: function () {
      var that=this
      this.$axios
        .get("/kugou", {
          params: {
            keyword: this.query,
            page: 1,
            pagesize: 10
          },
        })
        .then(
          function (res) {
            that.musicList.splice(2, 1, res.data.data.info);
          },
          function (err) {
            console.log(err);
          }
        );
    },
    kuwoSearch: function () {
      var that=this
      this.$axios
        .get("/kuwo", {
          params: {
            all: this.query,
            ft: "music",
            itemset: "web_2013",
            client: "kt",
            pn: 0,
            rn: 10,
            rformat: "json",
            encoding: "utf8",
          },
        })
        .then(
          function (res) {
            that.musicList.splice(3, 1, eval("(" + res.data + ")").abslist)
          },
          function (err) {
            console.log(err);
          }
        );
    },
    miguSearch: function () {
      var that=this
      this.$axios
        .get("/migu", {
          params: {
            keyword: this.query,
            rows: 10,
            type: 2
          },
        })
        .then(
          function (res) {
            that.musicList.splice(4, 1, res.data.musics)
          },
          function (err) {
            console.log(err);
          }
        );
    },
    baiduSearch: function () {
      var that=this
      this.$axios
        .get("/baidu", {
          params: {
            query: this.query,
            format: "json",
            page_size: 10,
            method: "baidu.ting.search.merge",
          },
        })
        .then(
          function (res) {
            that.musicList.splice(5, 1, res.data.result.song_info.song_list)
          },
          function (err) {
            console.log(err);
          }
        );
    },
    wangyiMusicPlay: function (id) {
        var that = this
        this.$axios.get("/wangyi/song/url", {
            params: {
                id: id
            }
        }).then(
            function (res) { that.musicUrl = res.data.data[0].url },
            function (err) { console.log(err) }
        )
        this.audioPlayorPause = !this.audioPlayorPause
        if (this.audioPlayorPause) {
            this.$refs.audio.play()
        }
        else {
            this.$refs.audio.pause()
        }
    },
    qqMusicPlay:function(id){
        var that = this
        this.$axios.get("/qq/music/song", {
            params: {
                songmid: id,
                guid:"126548448",
                lyric:0
            }
        }).then(
            function (res) { that.musicUrl=res.data.data.musicUrl },
            function (err) { console.log(err) }
        )
        this.audioPlayorPause = !this.audioPlayorPause
        if (this.audioPlayorPause) {
            this.$refs.audio.play()
        }
        else {
            this.$refs.audio.pause()
        }
    },
    kugouMusicPlay:function(hash){
        var that = this
        this.$axios.get("/musicurlkugou", {
            params: {
              cmd:'playInfo',
              hash:hash
            }
        }).then(
            function (res) { that.musicUrl=res.data.url },
            function (err) { console.log(err) }
        )
        this.audioPlayorPause = !this.audioPlayorPause
        if (this.audioPlayorPause) {
            this.$refs.audio.play()
        }
        else {
            this.$refs.audio.pause()
        }
    },
    kuwoMusicPlay:function(MUSICRID){
        var that = this
        this.$axios.get("/musicurlkuwo", {
            params: {
              format:'mp3',
              rid:MUSICRID.split('_')[1],
              type:'convert_url3'
            }
        }).then(
            function (res) { that.musicUrl=res.data.url },
            function (err) { console.log(err) }
        )
        this.audioPlayorPause = !this.audioPlayorPause
        if (this.audioPlayorPause) {
            this.$refs.audio.play()
        }
        else {
            this.$refs.audio.pause()
        }
    },    
    miguMusicPlay:function(mp3){
        this.musicUrl=mp3
        this.audioPlayorPause = !this.audioPlayorPause
        if (this.audioPlayorPause) {
            this.$refs.audio.play()
        }
        else {
            this.$refs.audio.pause()
        }
    },  
    baiduMusicPlay:function(songid){
        var that = this
        this.$axios.get("/baidu", {
            params: {
              method:'baidu.ting.song.playAAC',
              songid: songid,
              from:'web'
            }
        }).then(
            function (res) { 
              that.musicUrl=res.data.bitrate.file_link
            },
            function (err) { console.log(err) }
        )
        this.audioPlayorPause = !this.audioPlayorPause
        if (this.audioPlayorPause) {
            this.$refs.audio.play()
        }
        else {
            this.$refs.audio.pause()
        }
    },      
    wangyiMvPlay: function (mvid, name) {
        this.videoname = name
        var that=this
        this.$axios.get("/wangyi/mv/url",{
          params:{
            id:mvid
          }
        }).then(
            function (res) { that.mvUrl = res.data.data.url },
            function (err) { console.log(err) }
        )
    },    
    kugouMvPlay:function(mvhash,name){
        this.videoname=name
        var that = this
        this.$axios.get("/mvurlkugou", {
            params: {
              cmd:100,
              hash:mvhash,
              ismp3:1,
              ext:'mp4'
            }
        }).then(
            function (res) { console.log(res);that.mvUrl=res.data.mvdata.le.downurl },
            function (err) { console.log(err) }
        )
    },    
    musicPlayControl: function (isplay) {
        this.isAudioShow=true
        if (isplay) {
            //console.log("play")
        }
        else {
            //console.log("pause")
        }
    }, 
    mvPlayControl: function (c) {
        if (c) {
            this.$refs.video.pause()
            this.palyorpause = !this.palyorpause
        }
        else {
            this.palyorpause = !this.palyorpause
            if (this.palyorpause) {
                this.$refs.video.pause()
            }
            else {
                this.$refs.video.play()
            }

        }
    },
  },
};
</script>

<style>

</style>
