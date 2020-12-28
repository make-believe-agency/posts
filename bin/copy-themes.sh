themes=(
	casper
	norlin
	attila
	london
	massively
	bleak
	the-shell
	vapor
        pico
        lyra
	liebling
)

for theme in "${themes[@]}"
do
	cp -Rf "node_modules/$theme" content/themes
	cp -Rf "bin/$theme" content/themes
done
