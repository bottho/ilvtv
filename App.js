//var React = require('react');
//var ReactDOM = require('react-dom');

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
function checkScroll(){
for(var i = 0; i < videos.length; i++) {

        var video = videos[i];

        var x = video.offsetLeft, y = video.offsetTop, w = video.offsetWidth, h = video.offsetHeight, r = x + w, //right
            b = y + h, //bottom
            visibleX, visibleY, visible;

            visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
            visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

            visible = visibleX * visibleY / (w * h);

            if (visible > fraction) {
                video.play();
            } else {
                video.pause();
            }
    }
}

window.addEventListener('scroll', checkScroll, false);
window.addEventListener('resize', checkScroll, false);


var VideoContainer = React.createClass({

  _handleScroll(ev){
    console.log("scrolling!");
  },
  componentDidMount() {
    videos = document.getElementsByTagName("video");
  },
  render: function() {
    var videos = this.props.videoList.map(function(clip, key) {
      return (
      <div key={"clip_" + key}>
        <h1>{clip.title}</h1>
        <video controls>
          <source src={clip.stream.file} type="video/mp4" />
          </video>
      </div>
      );
    });
    return (<div>{videos}</div>);
      }
  });

ReactDOM.render(
  <VideoContainer videoList={JSONVideo.clips} />,
  document.getElementById('example')
);
