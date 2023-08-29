import { Dimensions, Image, Text, View, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function Post() {
  const windowWidth = Dimensions.get("screen").width;
  return (
    <View
      style={{
        width: windowWidth,
        height: 300,
        // backgroundColor: "blue",
        borderWidth: 1,
        padding: 15,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "green",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          padding: 15,
        }}
      >
        <View style={styles.avatarStack}>
          <Image
            source={{
              uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAABR1BMVEWE0PiqOS0tLS3mmXP////6+vrm5ubq6urt7e0mJSXj4+P39/fw8PD09PTg4OC3eVyI1/96Iht6zvkrKCbDgmIkKSvvn3cpIx8jEwBZhJqw3PUfAABspsXomG/NiGepNCdVfJEnHRYgCQA3Q0rXj2tmIBuRLSSmJRSnLR7c8f6f2fiAyO5ysdIaAACU1vl5veAyODxmm7fD4/Y4MC4AGiIAFB89UFusGwBtBgjZw8Dn1dKvRTmkHgfI3epgj6keEg5CXWyN4P9MbH2YZk9iSDyDWEZGNzJvTT9UPTXYpI/mjl6pc1kUIyelYUWQvNqijI68tLnJrKayu8ednqyAf4W1a0mVscgeO0hsXVnbnYGwhnXMo5aDor56ant5Slh6T1N7iqCba3elWVqdi52fTz+oSUSVVkOEOCuefYukZGjDhYG4bWa0XVXdWN8QAAAM6ElEQVRoga2b+1fbOBaADbZsE9uJcRICKRACtHnRAGm3FBpaWmhnWh5bpgu7M8zsbqdlOwX+/5/36mFZdiTZ7YzO0XE4dfX5PiXLV4ZlObZllWxkOSWLdvIbWS7pHul+KSA9IN2H7pLuke5YyIaOryUbfsOA8DcMmgxocwBcbY8ObsDfDvybgyhU6C7pACY9ID0g3efds13SEe/wAI5D4eS3LcDZoASOfxuAxncggnTSWB3aYz2LhStCHEvl4o/AsXRwg8ic0g1VONUNVnhG6fAAoGyvNxqNmqSNer0yUzxRtkMUT4B4cK7wWKmxRQGOHzdRuzv5eFnZUa/ZH0bQDNbI72F/1CN64GoXZHbSSk3UDvfBY5Wg22W4r4z/hn8vw7+V8RXug+6XseweGjWNhJppUTRs9ojsJepsZTYoBSAyOB7YiQEGvstmfh6rnXaP+7pL1d7rK8GJEvr71M+RTQYUAylj11La5k7W5jazOVx7ILOezBuRv5DNEWImwf6OXPKbYBGxOfz2HQ/1+jJ0CE0mvzHsOS4ZmAYSA7gEQAfFAN/I6sbiiudJxgZ9y8ib2wsL2xuGlD/c1ySZUpxkMo83GeeOFG2Ez7cerr54sfqwsTJQ4ifi3IkHp2onDie4pM1d0iO+7jel6I2Z1RnW2qvPZXQj6ge24PPEo5nPuxRg0NxG3Q7xNMTdbV82rBFuv5gR2vyKlG4YIzSRvzJxTtwylfcTm0vFNoyNhzOp9lAuO9a9rZtYiBuyDn6O3THuVm+oiK76TKatbspvNKKRywHJ4D65BtzmsUnsMorTUE+BDhdWs/DGgQIOlucAlE6epTi3Mz9HxCQONYlC5dC2suyZmXsq0eFZe9lAcphDqXJ7yZMGGGlZixOfU1idtJEqt8e5jcrvISa/hh0+n9A61rsGbowcnjxpnqPJ07ClE4uncjUMX2lL4E908Kgpn1jgMVyQ1035uacZ6Hvg2OlTfk6ucpt7Qy18YR7jqtO8VfPUjumWwubpOEeorx0HO9x0trVXXur/E8iOMnHuyeJcHWNU8o3GBBvaq0297Mb+ZG6fzG16dmisVGXs6fb0gnR2TVovk+PE+Zz5vCqvxWJvtaVsaPNrG3q6MJ8TnzfA1z2hI1fPXrinQmPHm1/Q0vs+AKB7vgv+7gap+RybRPvoxsG8ho2Ff6L731HTnrA5ljcOQ73Bn0hdTWyNrYGO3iN+juXHsZ6J830tey2XDfQ1HX3IV+ZlbnOH2dzRZZcwX+5cetTEfu6B3J5ocxLnOqWHr5RunqHr7B71xPkcHsMHmX181UUZzGXF2BDxulQ7RFhm2kWblzRKDzcL6ZzRNREX9USbY5lJ6KGRztvSBq9P1+sa+rx6XWMMidxe1uYadLidMvijw+PDIw2+qplgo31rwuaBpxV8S0zo9eMKtMNHavo9TaIdYljK5iC/Bm0sioLXj2oV0o5OlKIfqMeK9rnNfT8IcA90gr9cS81kIPgy5tdeK2VXLuSx6AGDJrldJ/hgVRz4TaVmmuY6ll1J1zt8bPOAPYY2xlPuVv+hYpKGhT9U0Ku6TNP0KJTbXLd0Cl+JcXZyWDMTukp27QTjpW3e09wKWV00+aPjdTOh136Q0xsao0ejtM21U2mYGvZNxTRF+o9S+vyiZsBhKbY5aTrBjXBVHPbHmpmiV958MzxiUGpz+R6AFF4/WjfTdKnT6eHE310mec6KNZXefjTNDP21JNlo4UaTSk5srg1ygIs5pv7DXJoOipeYXQ/HGyKxzfXLZSM80MGx7NMT9PkN3YiRm9hcO6fgBXNDBzeXJfSqJtRYfndJhvNyXs5SGU4Ch1R7nJ3itEmGGt2nNtezDWNTWK7XX0/CQfXHabtr0yu0PrE5yXB5W7oDAX5yKIOb6zDFCfjGK/2bE5nZyLtajr8Zb989ToZ9XJOxifSvp3nMNfQvTkbE4twPmvr73i6tC/BHKjZuxzH95PRMP6gTx7kefrZk1pIsIjd53ObiSe7N6d/1+yQ9bHO8oNLugkTvl+aOE2s+XtewwfSPWUhUjvWSjwKXxrkefr5kJtPmiVZwaHXmlafHObHGbO7qnxHgXOv1Rzlsk0r+ppILh2UztjnSOnv00zvuRvVpvdIh0Z9QxwC4PoSaLrG5lxPmQzOesOvVPDZzuHrl9OJDDpzZXP9SboT/4Dtfyzlskz4nuFue1iHFgc3hbSUHPtiKna2WZ3CzRk1+eHpxmbMx1mc2z9l/es5yq2xGyWr9kJj80cXFZV7GpjZ3vRx4vHQ9yVf6HInJ6tpZjs4x3C9k81jrf8sV3Jw7wvCG6ntPCo6ozR0tfPANcJPMq7pXJd5GheKcvx0Xlry9nQ+H9SvY3HGRdnf9O2w+XwjuO15+bg9X2BpKsYpIwYm3F4KT+RzvQOqXcPFWUP1oKVf0yuOCajfIrrOdO58bB4z+z7f59GpBbx+SNRz+upKzct5gWeZFP5dt/mtGvx0Utz75olhkDcfeGVbDn3JEXzrfWMV35rKNZona3HGsHPgm3WRvGNGVlr70lsZGezFP9GgflyTQdbvW3eNoq67BkD9r6QP6oNWtnK89RoSYzcHfczwuXMEuVyVLcVNNf3cW4VerdoFgG5IvTfT7ed6LInlXa5PPpQMVfck8I6OEB228KaJfuzZdbnOUY3T6inyPTFXRQKH5n8/YIIMnbTCRtJCCt55PqkXo+7l+S2Ybx1r1CTUk0KWCCzM4yN7Y0skeiUU62mBj76h8J3lwvDyZZ5cvPoTC/3jYwF+alPg+qxZh+3BKcri4RnJM8oH88qJSySwk8W7kLwIKf/lbXW1sq0btsX049uVcpvcw3Fxc2WqQMONfzKLwCu971gT8Ot0HTlk5NBZXDp4sKODk6znO7bQ2SrIJOHi1Nt1uk2Q9v4bTBqhxePb+iu66An95HdpyJW6/fLgcGIKqlUqPmj6rjSIFPKB4ycy2sjVdbWDBDxbJoL/+9u/Ku6Ulsg0ibRcX//ntv4OcL6rQgrgSMP6WKnG5MBxsbmxsbOICLOPDx9b46ezTC+JrNQX9/v3Zp+PfP52pXQ23vh3vt7MiHQepU2wYXn7cGbemph7Mzj79rKTXTu9DezDV6u5cf9KEebTPyo/cpGZCtYYNNz9NdbpTtM3Ozn4xFfT/AXr2Abmt1el8vVSJ309qJpJqEano4dnHqU5rijdMJ44+YXfCTm7sdn//VV6ttp9UfyZ1rxLRw8EfXOiEPrscx7bQvqTZWPyd3y8l+H66ADMuxiuAniKGn6UpbjnDfpC9FeOz9CgQivGE72pBWvSXH7qdCTSlP63QBMvxE2Jz/Me08BDj+Ps5z+1JraCY5sKzayl6SnR6zF+uLYObz0rZ0LrjDyk6ShXdCqXIws5Q+Kk7qXFR8595dp07hT8nVJ60ztczjo9G6WI8oeKXLyrCwVeV2Jz+Jc7un/VsEP4Zt3xfUWhN6qao4sOzZ2qxacNOT+lf8tjY8p8YvaQtwMSKD3/daelHY/Tlubn12Xw2tJ2PocE/ZAoFmCzUYp+PwNw7uYNR+tOLGmYXubtzN+C1Ycn380wBJkwwf4yLjEYNX5QNhr8eDG1LqF6fLMZDlv++kNwJvejdnTuLVzjy4nqhDpr8dm60jp6h55ubtdazPSuv0Br+1b8tTi/Mnuru8QpPbQGme1PQ6t/QxruyYjybl2InNZDBX04f78kOTUjhrntVWPNFWqu7K6neLzGb8x7XBQfnrfw8U5gNvhZXOKaKjieL8ahJnL3cDFu0da/3LF1xvVATG8sf2Ld/jeHHt+xQQVx0C799erhAU1xvnY//vOpb4ytXW1wvPUQD3d27+7N+17neTR+OEqfU2OaJScQ0ZKErzZKigNjdG1tWXJ/Y3PVQtv7dj68usu863617ENtHKAF8U3E9OVCBzlvfp/vu+IoeheMHKiaL69OFxln5fSewPMB/s/Tdzo3nSyqZU4AiB6ds7/z6mxwfHvamVOTgVDbO2aNZrBPZfdffvZO8P6jQ11clenCOHxxSxLm8uD52yaT7uzfPCvDBQW53PYcNGq/Q+Kkt4WQSLcZjRbek+NQnvwNWE4z9PeAdlXZvu52uWv+tbqdze+5avo+ECmbEAelBC9o8OSxnebs3d+MxPEH6EVrAHe9c3+x6LjuVWRL8XG1zNw5DFyVFxw6rB47r/9nvAPt+4O2d39zeAY231t3tzfleYCGfxDXyHCIvHZTHuVjVTAedKLS2U49H5Xax3NAD0vFJRB/55fLe7u7u3t5eOcAnVLF9ETkcCLKXBZvrDk5lHi+VhoKJHpDuk6vngqzQPdensgoye+SwnIu4zNn5XFFcP3lYTnEi1xNP5JbYodD4RG5s91h+6ufCS0OquN4n17ge1ktqgoUekO4LV9o94Up7umI/Mygf/P/ngavn2sB0fgAAAABJRU5ErkJggg==",
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              borderColor: "white",
              borderWidth: 2,
            }}
          />
          <Image
            source={{
              uri: "data:image/png;base64,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",
            }}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              borderColor: "white",
              borderWidth: 2,
              position: "absolute",
              bottom: 2,
              right: 2,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",

            gap: 5,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, paddingLeft: 6 }}>
            <Text style={{ fontWeight: 600 }}>My Nickname</Text>
            <Text style={{ fontWeight: 600 }}>x</Text>
            <Text style={{ fontWeight: 600 }}>My Friends</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EvilIcons name="location" size={24} color="black" />
            <Text>Location</Text>
          </View>
        </View>
      </View>
      <Image
        source={{
          uri: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
        }}
        style={{ flex: 4, backgroundColor: "black" }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  avatarStack: {
    display: "flex",
    position: "relative",
    widht: 60,
    height: 60,
  },
});
