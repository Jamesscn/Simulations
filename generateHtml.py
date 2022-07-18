import json

template = """\
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="James Scoon's Personal Website!">
        <meta name="author" content="James Scoon">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap-reboot.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
		<link href="website/index.css" rel="stylesheet">
		<title>James' Simulations</title>
	</head>
	<body class="">
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a href="https://jamesscn.github.io/" class="navbar-brand">James Scoon</a>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link" href="https://jamesscn.github.io/about.html">About Me</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Games
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="https://jamesscn.github.io/pacman/">Pacman</a></li>
                            <li><a class="dropdown-item" href="https://jamesscn.github.io/wordscramble/">Wordscramble</a></li>
                            <li><a class="dropdown-item" href="https://jamesscn.github.io/chipeight/">Chip-8 Emulator</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="https://github.com/Jamesscn/Tetris">Tetris</a></li>
                            <li><a class="dropdown-item" href="https://github.com/Jamesscn/Snake">Snake</a></li>
                            <li><a class="dropdown-item" href="https://github.com/Jamesscn/minefield">Minesweeper</a></li>
                        </ul>
                    </li>       
                    <li class="nav-item"><a class="nav-link" href="https://jamesscn.github.io/Simulations/">Simulations</a></li>
                    <li class="nav-item"><a class="nav-link" href="https://jamesscn.github.io/Knowledge/">Tutorials</a></li>
                </ul>
            </div>
        </nav>

		<div class="container px-2 py-2">
		<div class="text-center mx-5 my-5 text-center">
			<h1 class="display-4"><strong>Simulations</strong></h1>
			<p>I find some things best explained with simulations. Some of these simulations are intented to help explain a concept, and others are just me messing around with different tools. Nevertheless, I thought it would be nice to share this with the world, so I hope you enjoy!</p>
		</div>
		<hr class="my-5">

		<div class="row gx-5 gy-5 justify-content-center text-center">
		{0}
		</div>
		<hr class="mt-5">
        <footer class="container">
            <p>Made by James Scoon</p>
        </footer>
		</div>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
	</body>
</html>
"""

card = """\
<div class="card rounded-4 col-3 px-0 mx-5 text-dark">
<h5 class="card-header"><strong>{0}</strong></h5>
<i class="fa-solid fa-{3} mt-3" style="font-size: 5rem; color: {4};"></i>
<div class="card-body">
<p>{1}</p>
<a href="{2}" class="btn btn-primary">Run now!</a>
</div>
</div>
"""

with open("pages.json") as pagefile:
    pages = json.load(pagefile)
    pagefile.close()

newHtml = ""
for page in pages:
    newHtml += card.format(page["name"], page["description"], page["link"], page["icon"], page["color"])
html = template.format(newHtml)

with open("index.html", 'w') as htmlfile:
    htmlfile.write(html)
    htmlfile.close()