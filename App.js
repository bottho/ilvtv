var JSONVideo = {
  "clips": [
    {
      "title": "Clip Title 1",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_1mb.mp4"
      }
    },
    {
      "title": "Clip Title 2",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_2mb.mp4"
      }
    },
    {
      "title": "Clip Title 3",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_5mb.mp4"
      }
    },
    {
      "title": "Clip Title 4",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_1mb.mp4"
      }
    },
    {
      "title": "Clip Title 5",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_2mb.mp4"
      }
    },
    {
      "title": "Clip Title 6",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_1mb.mp4"
      }
    },
    {
      "title": "Clip Title 7",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_2mb.mp4"
      }
    },
    {
      "title": "Clip Title 8",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_1mb.mp4"
      }
    },
    {
      "title": "Clip Title 9",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_2mb.mp4"
      }
    },
    {
      "title": "Clip Title 10",
      "thumbnail": "freeze_frame_10/46/95/27_304194_20160613-EM-Sieg-Postings-mp4.jpg",
      "stream": {
        "protocol": "rtmp",
        "streamer": "fms.edge.cdn.castaclip.net",
        "file": "resources/SampleVideo_1280x720_2mb.mp4"
      }
    }
  ]
};

var videos;
var isPlaying = false;

function checkScroll(){
  clearTimeout(timer);
  timer = setTimeout(function(){
    playing = false;
    for(var i = 0; i < videos.length; i++) {

      var video = videos[i];

      var x = video.offsetLeft,
      y = video.offsetTop,
      w = video.offsetWidth,
      h = video.offsetHeight,
      r = x + w,
      b = y + h,
      visibleX,
      visibleY,
      visible;

      visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
      visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

      visible = visibleX * visibleY / (w * h);

      if (visible > fraction && !playing) {
        video.click();
        playing = true;
      } else {
        video.pause();
      }
    }
  }, 150)
}

var VideoContainer = React.createClass({
  componentDidMount() {
    videos = document.getElementsByTagName("video");
    window.addEventListener('scroll', this.handleScroll, false);
  },
  getInitialState: function(){
    return{
      elements: this.buildElements(0, this.props.initLoad),
      isInfiniteLoading: false
    }
  },
  buildElements: function(start, end){
    var elements = [];
    if(end > this.props.videoList.length)
    {
      end = this.props.videoList.length;
    }
    for(var i = start; i < end; i++)
    {
      elements.push(
        <div key={"clip_" + i}>
          <h1>{this.props.videoList[i].title}</h1>
          <VideoPlayer source={this.props.videoList[i].stream.file} thumb={this.props.videoList[i].thumbnail} keyId={i} />
        </div>
      );
    }
    return elements;
  },
  handleInfiniteLoad: function() {
    var that = this;
    this.setState({
      isInfiniteLoading: true
    });
    setTimeout(function(){
      var elemLength = that.state.elements.length,
      newElements = that.buildElements(elemLength, elemLength + 2);
      that.setState({
        isInfiniteLoading: false,
        elements: that.state.elements.concat(newElements)
      })
    },2500);
  },

  elementInfiniteLoad: function() {
    return (
      <div className="spinner-circle"></div>
    );
  },
  handleScroll(){
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset + 100;

    if(windowBottom >= docHeight) {
      this.handleInfiniteLoad();
    }
  },
  render: function() {
      return (
        <div>{this.state.elements}</div>
      );
  }
});

var VideoPlayer = React.createClass({
  getInitialState: function(){
    return {
      isPlaying: false,
      hasStarted: false,
      timeout: null,
      height: document.documentElement.clientWidth < 720 ? Math.floor(document.documentElement.clientWidth * 0.66) : 480,
      width: document.documentElement.clientWidth < 720 ? Math.floor(document.documentElement.clientWidth) : 720
    };
  },
  componentDidMount: function(){
    window.addEventListener('scroll', this.checkScroll, false);
    window.addEventListener('resize', this.checkScroll, false);
  },
  play() {
    this.videoElement.play();
    this.setState({
      isPlaying: true,
      hasStarted: true
    });
  },
  pause(){
    this.videoElement.pause();
    this.setState({ isPlaying: false });
  },
  togglePlay(){
    if(this.videoElement.paused){
      this.play();
    }
    else{
      this.pause();
    }
  },
  resize(){

  },
  playEnd(){
    console.log("content finished");
  },
  playBegin(){
    console.log("content started");
  },
  checkScroll(){
    isPlaying = false;
    if(this.timeout)
    {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(function(){
      this.isVisible();
      this.timeout = null;
    }.bind(this), 300);
  },
  isVisible(){
    var x = this.videoElement.offsetLeft,
    y = this.videoElement.offsetTop,
    w = this.videoElement.offsetWidth,
    h = this.videoElement.offsetHeight,
    r = x + w,
    b = y + h,
    visibleX,
    visibleY,
    visible;

    visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
    visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

    visible = visibleX * visibleY / (w * h);
    if (visible > 0.8 && !this.state.isPlaying && !isPlaying) {
      this.play();
      isPlaying = true;
    } else {
      this.pause();
    }
    console.log("Width: " + document.documentElement.clientWidth);
    console.log("Width Less than 720: " + document.documentElement.clientWidth < 720);
    console.log("Width")
    this.setState({
      height: document.documentElement.clientWidth < 720 ? Math.floor(document.documentElement.clientWidth * 0.66) : 480,
      width: document.documentElement.clientWidth < 720 ? Math.floor(document.documentElement.clientWidth) : 720
    });
  },
  render: function(){
    return(
      <div
      className="video-player"
      onClick={this.togglePlay}>
        <div
          style={this.state.isPlaying ? {display:"none"} : {}}
          className={this.state.hasStarted ? "video-overlay icon-pause" : "video-overlay icon-play" }></div>
        <video
          id = {"video_" + this.props.keyId }
          ref={(el) => {
            this.videoElement = el;
          }}
          onEnded={this.playEnd}
          onLoadedData={this.playBegin}
          preload="none"
          poster={"http://images.castaclip.net/resize/" + this.state.width + "x" + this.state.height + "/" + this.props.thumb}>
          <source src={this.props.source} type="video/mp4" />
        </video>
      </div>
    );
  }
})

ReactDOM.render(
  <div>
  <VideoContainer videoList={JSONVideo.clips} initLoad={5} />
  </div>,
  document.getElementById('example')
);
