const mapContainer = document.getElementById('map');
const mapOption = {
  center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
  level: 3
};
const map = new kakao.maps.Map(mapContainer, mapOption);
const ps = new kakao.maps.services.Places();
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

document.getElementById('searchBtn').addEventListener('click', function() {
  const keyword = document.getElementById('keyword').value;
  if (!keyword.trim()) {
    alert('검색어를 입력하세요!');
    return;
  }
  ps.keywordSearch(keyword, placesSearchCB);
});

function placesSearchCB(data, status) {
  if (status === kakao.maps.services.Status.OK) {
    const bounds = new kakao.maps.LatLngBounds();

    data.forEach(place => {
      displayMarker(place);
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    });

    map.setBounds(bounds);
  } else {
    alert('검색 결과가 없습니다.');
  }
}

function displayMarker(place) {
  const marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x)
  });

  kakao.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
    infowindow.open(map, marker);
  });
}
