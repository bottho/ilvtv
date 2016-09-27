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
var fraction = 0.8;
var playing = false;
var timer;

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
        video.play();
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
    window.addEventListener('scroll', checkScroll, false);
    window.addEventListener('resize', checkScroll, false);
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
          <VideoPlayer source={this.props.videoList[i].stream.file} />
        </div>
      );
    }
    return elements;
  },
  handleInfiniteLoad: function() {
    console.log("handleInfiniteLoad");
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
    console.log(this.state);
      return (
        <div>{this.state.elements}</div>
      );
  }
});

var VideoPlayer = React.createClass({
  play() {
    this.videoElement.play();
  },
  pause(){
    this.videoElement.pause();
  },
  togglePlay(){
    if(this.videoElement.paused){
      this.play();
    }
    else{
      this.pause();
    }
  },
  playEnd(){
    console.log("content finished");
  },
  playBegin(){
    console.log("content started");
  },
  render: function(){
    return(
      <div
      className="video-overlay icon-play"
      onClick={this.togglePlay}>
        <video ref={(el) => {
          this.videoElement = el;
        }}
          onEnded={this.playEnd}
          onLoadedData={this.playBegin}
          preload="none">
          <source src={this.props.source} type="video/mp4" />
        </video>
      </div>
    );
  }
})

var VideoOverlay = React.createClass({
  propTypes:{
    error: React.PropTypes.bool,
    togglePlay: React.PropTypes.func,
    paused: React.PropTypes.bool,
    loading: React.PropTypes.bool
  },

  renderContent(){
    var content;
    if(this.props.error)
    {
      content = (
        <div>
        <p>{this.props.copyKeys.sourceError}</p>
        </div>
      )
    }
    else if(this.props.loading){
      content = (
        <div className="loader">
        <Loader />
        </div>
      )
    }
    else {
      content = (
        <div className="videoPlay" onClick={this.props.togglePlay}>
        {this.props.paused ? <i className="icon-pause"></i> : ''}
        </div>
      );
    }
  },
  render() {
    return (
      <div className="overlay">
      {this.renderContent()}
      </div>
    );
  }
})

var Loader = React.createClass({
  render: function(){
    return (<div className="spinner-circle"></div>);
  }
});

ReactDOM.render(
  <div>
  <VideoContainer videoList={JSONVideo.clips} initLoad={5} />
  </div>,
  document.getElementById('example')
);
