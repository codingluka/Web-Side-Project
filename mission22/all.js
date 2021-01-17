const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.querySelector('#count')
const total = document.querySelector('#total')
const movieSelect = document.querySelector('#movie')
let ticketPrice = +movieSelect.value

// 計算選擇的座位數量價格
function updateSelectCount(){
	// 將所選取到的座位塞入 selectedSeats 這個變數中
	const selectedSeats = document.querySelectorAll('.row .seat.selected')

	const selectedSeatCount = selectedSeats.length
	count.innerText = selectedSeatCount// 將選到的座位數量塞到 count 裡面
	total.innerText = selectedSeatCount * ticketPrice	// 計算座位數量跟票價

	// 將[...selectedSeats]解構的值塞到函式裡面運算，再把結果 return 出來
	const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
}

// 依照選擇的電影變更價格
movieSelect.addEventListener('change', e=>{
	ticketPrice = +e.target.value

	// 查看我們選擇的電影索引跟價格
	// console.log(e.target.selectedIndex, e.target.value) 

	// 將電影索引跟價格的參數塞到 setMovieData 裡面
	setMovieData(e.target.selectedIndex, e.target.value)
	updateSelectCount()//執行
})

// 透過 localStorage 抓取電影索引值跟價格
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex)
	localStorage.setItem('selectedMoviePrice', moviePrice)
}

// 紀錄資料，刷新後記錄仍然在
function populateUI(){
	// 因為剛才是轉成字串，這裡要轉成物件
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
	if (selectedSeats !== null && selectedSeats.length>0) {
		seats.forEach((seat, index)=>{
			if(selectedSeats.indexOf(index)>-1){
				seat.classList.add('selected')
			}
		})
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
	if(selectedMovieIndex !== null){
		movieSelect.selectedIndex = selectedMovieIndex
	}
}
populateUI()


// 監聽容器內座位數值的變化
container.addEventListener('click', e=>{
	// contains 會返回一個 boolean 值
	if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected')
		updateSelectCount()
	}
})

updateSelectCount()