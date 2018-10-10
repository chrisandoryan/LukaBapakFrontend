import React from 'react'
import {
    Link
} from 'react-router-dom'

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer class="flex-rw" style={{marginTop: 100, marginBottom: 50}}>
                <ul class="footer-list-top">
                    <li><button style={{width: 400}}>LukaBantuan</button></li>
                    <li><button style={{width: 400}}>Panduan LukaBapak</button></li>
                    <li><button style={{width: 400}}>Panduan Keamanan</button></li>
                </ul>
                <ul class="footer-list-top">
                    <br/>
                    <h2 style={{textAlign: "center"}}>LukaBapak</h2>
                    <br/>
                    <br/>
                    <li>Tentang LukaBapak</li>
                    <li>Aturan Penggunaan</li>
                    <li>Kebijakan Privasi</li>
                    <li>Cara Bijak Menjalani TPA</li>
                    <li>Cara Bijak Menjalani TPA</li>
                    <li>Cara Bijak Menjalani TPA</li>
                    <li>Cara Bijak Menjalani TPA</li>
                    <li>Cara Bijak Menjalani TPA</li>
                    <li>Cara Bijak Menjalani TPA</li>
                </ul>
                <ul class="footer-list-top">
                    <br/>
                    <p>Lebih mudah dan hemat di aplikasi Bukalapak. Masukkan nomor handphone kamu untuk mendapatkan aplikasi LukaBapak.</p>
                    <br/>
                    <br/>
                    <li style={{margin: 0, padding: 0}}><input style={{width: 400}} type="text" /></li>
                    <li><button style={{width: 400, marginTop: 0}}>Kirim Link via SMS</button></li>
                </ul>
            </footer>
        )
    }
}

export default Footer;
