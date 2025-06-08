// Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // For anchor links only
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after click
                    mainNav.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                }
            }
        });
    });
    
    // Resize observer for better responsive behavior
    const resizeObserver = new ResizeObserver(() => {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });
    
    resizeObserver.observe(document.body);



// Inisialisasi peta
const map = L.map('map').setView([-8.633, 119.7610], 13);


    // Background slideshow
    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.background-slide');
        let currentSlide = 0;
        
        function nextSlide() {
            // Sembunyikan slide aktif saat ini
            slides[currentSlide].classList.remove('active');
            
            // Pindah ke slide berikutnya
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Tampilkan slide baru
            slides[currentSlide].classList.add('active');
        }
        
        // Mulai slideshow dan ganti gambar setiap 5 detik
        setInterval(nextSlide, 3000);
    });


// Basemap OSM
const basemapOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Basemap Google Maps
const baseMapGoogle = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  attribution: 'Map by <a href="https://maps.google.com/">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Basemap Google Satellite
const baseMapSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  attribution: 'Satellite by <a href="https://maps.google.com/">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Tambahkan salah satu basemap secara default
baseMapSatellite.addTo(map);

// Daftar semua pilihan basemap
const baseMaps = {
  "OpenStreetMap": basemapOSM,
  "Google Maps": baseMapGoogle,
  "Google Satellite": baseMapSatellite
};

// Tombol "Home"
const homeControl = L.control({ position: 'topleft' });
homeControl.onAdd = function(map) {
  const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
  div.innerHTML = '🏠';
  div.style.backgroundColor = 'white';
  div.style.width = '30px';
  div.style.height = '30px';
  div.style.lineHeight = '30px';
  div.style.textAlign = 'center';
  div.style.cursor = 'pointer';
  div.title = 'Kembali ke Home';
  div.onclick = function() {
    map.setView([home.lat, home.lng], home.zoom);
  };
  return div;
};
homeControl.addTo(map);

// Fitur "My Location"
L.control.locate({
  position: 'topleft',
  flyTo: true,
  strings: {
    title: "Temukan lokasiku"
  },
  locateOptions: {
    enableHighAccuracy: true
  }
}).addTo(map);

var symbologyPoint = { 
  radius: 5, 
  fillColor: "#9dfc03", 
  color: "#000", 
  weight: 1, 
  opacity: 1, 
  fillOpacity: 0.8 
} 

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const petaCards = document.querySelectorAll('.peta-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter cards
            petaCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('petaViewer');
    const modalImg = document.getElementById('fullPeta');
    const closeBtn = document.querySelector('.close-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const thumbnail = this.closest('.peta-card').querySelector('.peta-thumbnail img');
            modal.style.display = 'block';
            modalImg.src = thumbnail.src.replace('-thumb', ''); // Assuming you have higher res versions
        });
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Download buttons
    const downloadButtons = document.querySelectorAll('.peta-meta span:last-child, .download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would trigger a download
            alert('Download akan dimulai...');
        });
    });
});


const Pelabuhan = new L.LayerGroup(); 
$.getJSON("assets\Bentik\PelabuhanLabuhanBajo.geojson", function (OBJECTID) { 
    L.geoJSON(OBJECTID, { 
            pointToLayer: function (feature, latlng) { 
            return L.circleMarker(latlng, symbologyPoint);} 
        }).addTo(Pelabuhan); 
    }); 
Pelabuhan.addTo(map); ``

const BatasAdministrasi = new L.LayerGroup(); 
$.getJSON("assets\Bentik\Batasadministrasi.geojson", function (KECAMATAN) { 
L.geoJSON(KECAMATAN, { 
style: { 
color : "black", 
weight : 2, 
opacity : 1, 
dashArray: '3,3,20,3,20,3,20,3,20,3,20', 
lineJoin: 'round' 
} 
}).addTo(BatasAdministrasi); 
}); 
BatasAdministrasi.addTo(map); 

const Bentik = new L.LayerGroup(); 
$.getJSON("assets\Bentik\Bentik.geojson", function (class) { 
L.geoJson(class, { 
style: function(feature) { 
switch (feature.properties.class) { 
case 'Terumbu Karang': return {fillColor:"#97DBF2", fillOpacity: 0.8, weight: 
0.5, color: "#4065EB"}; 
case 'Hamparan Lamun':   return {fillColor:"#97DBF2", fillOpacity: 0.8, weight: 
0.5, color: "#4065EB"}; 
case 'Ganggang': return {fillColor:"#38A800", fillOpacity: 0.8, color: 
"#38A800"}; 
case 'Batuan':   
return {fillColor:"#E9FFBE", fillOpacity: 0.8, 
color: "#E9FFBE"}; 
case 'Pecahan Karang': return {fillColor:"#FFBEBE", 
fillOpacity: 0.8, weight: 0.5, color: "#FB0101"}; 
case 'Pasir':   return {fillColor:"#01FBBB", fillOpacity: 0.8, weight: 
0.5, color: "#4065EB"}; 
} 
}, 
onEachFeature: function (feature, layer) { 
layer.bindPopup('<b>Bentik: </b>'+ feature.properties.class) 
} 
}).addTo(Bentik); 
}); 
Bentik.addTo(map); 

const Component = {
  "PelabuhanLabuhanBajo": Pelabuhan,
  "BatasAdministrasiKecamatan": Batas Administrasi,
  "Bentik": Bentik
};

L.control.layers(baseMaps, Component).addTo(map);

let legend = L.control({ position: "topright" });


legend.onAdd = function () { 
    let div = L.DomUtil.create("div", "legend"); 
    div.innerHTML = 
        // Judul Legenda 
        '<p style="font-size: 18px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Legenda</p>' + 
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Infrastruktur</p>' + 
        '<div><svg style="display:block;margin:auto;text-align:center;stroke-width:1;stroke:rgb(252, 0, 0);"><circle cx="15" cy="8" r="5" fill="#D8A7D1" /></svg></div>Pelabuhan Labuhan Bajo<br>' + 
        // Legenda Layer Batas Administrasi 
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Batas Administrasi Kecamatan</p>' + 
        '<div><svg><line x1="0" y1="11" x2="23" y2="11" style="stroke-width:2;stroke:rgb(0,0,0);stroke-dasharray:10 1 1 1 1 1 1 1 1 1"/></svg></div>Batas Administrasi Kecamatan<br>' + 
        // Legenda Layer Tutupan Lahan 
        '<p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; margin-top: 10px;">Tutupan Lahan</p>' + 
        '<div style="background-color:rgb(190, 30, 239); height: 10px;"></div>Terumbu Karang<br>' + 
        '<div style="background-color:rgb(0, 253, 55); height: 10px;"></div>Hamparan Lamun<br>' + 
        '<div style="background-color: #38A800; height: 10px;"></div>Ganggang<br>' + 
        '<div style="background-color:rgb(174, 175, 151); height: 10px;"></div>Batuan<br>' + 
        '<div style="background-color:rgb(227, 138, 138); height: 10px;"></div>Pecahan Karang<br>' + 
        '<div style="background-color:rgb(180, 210, 12); height: 10px;"></div>Pasir<br>'; 
return div; 
}; 

legend.addTo(map);

