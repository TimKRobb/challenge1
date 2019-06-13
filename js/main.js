var output = "",
	day = new Date(),
	month_fr = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
	month_en = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
	d = day.getDate(),
	m = day.getMonth(),
	y = day.getFullYear(),
	dayValue = 24*60*60*1000;

function isLeapYear(year) {

	if (year%400 == 0) {
		return true;
	} else if (year%100 == 0) {
		return false;
	} else if (year%4 == 0) {
		return true;
	} else {
		return false;
	}

}

function drawCalendar(dateString) {

	// Fonction générale qui dessine le calendrier
	// L'argument passé est un string au format 'dd mmm yyyy'
	// et représente le jour actif. Si l'argument est invalide,
	// la date retenue est aujourd'hui.

	var date = new Date(dateString);

	if (isNaN(date.valueOf())) {	// Si la date passée en argument n'est pas valide,
		date = new Date();			// se baser sur la date d'aujourd'hui.
	};

		date.setHours(12);
		date.setMinutes(0);

	// Créer le HTML à mettre dans la section calendrier

	document.getElementById("calendrier").innerHTML = calHeader(date) + calTable(date);
}

function calHeader(date) {

	var leftArrows = "",
		rightArrows = "",
		calTitle = "",
		prevYear = "",
		prevMonth = "",
		nextMonth = "",
		nextYear = "",
		onClickDate = new Date(),
		d=0, m=0, y=0;

	// Générer le lien vers il y a un an

	d = date.getDate();
	m = date.getMonth();
	y = date.getFullYear();

	if (d==29 && m==1) {
		d=28;
	}

	prevYear = "<a href=\"#\" onClick=\"drawCalendar('" + d + " " + month_en[m] + " " + (y-1) + "');\"><<</a>";

	// Générer le lien vers il y a un mois

	d = date.getDate();
	m = date.getMonth();
	y = date.getFullYear();

	if ( d == 31 && ( m==4 || m==6 || m==9 || m==11 ) ) {
		d = 30;
	} else if ( d > 28 && m==2 ) {
		d = 28;
		if (isLeapYear(y)) {
			d=29;
		}
	}

	if ( m == 0 ) {
		y--;
		m=12;
	}

	prevMonth = "<a href=\"#\" onClick=\"drawCalendar('" + d + " " + month_en[m-1] + " " + y + "');\"><</a>";

	// Générer le lien vers dans un mois

	d = date.getDate();
	m = date.getMonth();
	y = date.getFullYear();

	if ( d == 31 && ( m==2 || m==4 || m==7 || m==9 ) ) {
		d = 30;
	} else if ( d > 28 && m==0 ) {
		d = 28;
		if (isLeapYear(y)) {
			d=29;
		}
	}

	if ( m == 11 ) {
		y++;
		m=-1;
	}

	nextMonth = "<a href=\"#\" onClick=\"drawCalendar('" + d + " " + month_en[m+1] + " " + y + "');\">></a>";

	// Générer le lien vers dans un an

	d = date.getDate();
	m = date.getMonth();
	y = date.getFullYear();

	if (d==29 && m==1) {
		d=28;
	}

	nextYear = "<a href=\"#\" onClick=\"drawCalendar('" + d + " " + month_en[m] + " " + (y+1) + "');\">>></a>";

	// Générer l'output en HTML

	leftArrows = "<div class=\"nav\">" + prevYear + "&nbsp;" + prevMonth + "</div>";

	calTitle = "<div class=\"title\">" + month_fr[date.getMonth()] + " " + date.getFullYear() + "</div>";

	rightArrows = "<div class=\"nav\">" + nextMonth + "&nbsp;" + nextYear + "</div>";

	return "<section id=\"header\">" + leftArrows + calTitle + rightArrows + "</section>";

//	return "<h1>" + prevYear + " < " + month_fr[d.getMonth()] + " " + d.getFullYear() +" > >></h1>";

}

function calTable(date) {

	var header = "<tr><th>Di</th><th>Lu</th><th>Ma</th><th>Me</th><th>Je</th><th>Ve</th><th>Sa</th></tr>",
		lines = [],
		weekDay = date.getDay(),
		weekOffset = Math.floor((date.getDate() + 6 - weekDay) / 7);

	for (var i=0;i<6;i++) {

		lines[i] = calLine(date,i-weekOffset);

	}

	return "<table>" + header + lines[0] + lines[1] + lines[2] + lines[3] + lines[4] + lines[5] + "</table>";
}

function calLine(date,offset) {

	var sunday = new Date(date.valueOf()+(dayValue*7*offset)-(dayValue*date.getDay())),
		cells = [];

	if (sunday.getMonth() != date.getMonth() && sunday.getDate() < 10 ) {
		return "";
	}

	for (var i=0;i<7;i++) {

		var d = new Date(sunday.valueOf()+(dayValue*i)),
			cellClass = "normal";

		cells[i] = d.getDate();

		cells[i] = "<a href=\"#\" onclick=\"drawCalendar('" +
			d.getDate() + " " +
			month_en[d.getMonth()] + " " +
			d.getFullYear() + "');\">" + cells[i] + "</a>";

		if (offset == 0 && date.getDate() == d.getDate() ) {
			cellClass = "highlight";
		} else if (date.getMonth() != d.getMonth() ) {
			cellClass = "greyed";
		}

		if (i==6 && d.getMonth() != date.getMonth() && d.getDate() > 27 ) {
			return "";
		}

		cells[i] = "<td class=\"" + cellClass + "\">" + cells[i] + "</td>";

	}

	return "<tr>" + cells[0] + cells[1] + cells[2] + cells[3] + cells[4] + cells[5] + cells[6] + "</tr>";

}

drawCalendar("");

