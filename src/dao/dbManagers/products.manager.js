import { productModel } from './models/products.model.js';

export default class productManager {
    constructor() {
        console.log('Working products with DB')
    }

    getAll = async () => {
        const products = await productModel.find().lean();
        return products;
    }

    getProductsById = async (_id) => {
        const products = await productModel.find().lean();
        let productById = products.find((product) => product._id.toString() === _id.toString());
        if (!productById) {
            return `No existe el producto con id ${_id}`;
        }else{
            return productById;
        }
    };

    insertMany = async () => {

        const products = [
            {
                title: "Apple iPhone 12 Pro",
                category: "Smartphones",
                description: "The Apple iPhone 12 Pro features a stunning Super Retina XDR display, A14 Bionic chip, and advanced triple-camera system for professional-quality photos and videos.",
                code: "IPHONE12PRO",
                price: 1099.99,
                thumbnail: "https://example.com/iphone12pro.jpg",
                stock: 10,
                status: true
            },
            {
                title: "Samsung Galaxy S21 Ultra",
                category: "Smartphones",
                description: "The Samsung Galaxy S21 Ultra is a powerful smartphone with a 108MP camera, 5G connectivity, and a dynamic AMOLED 2X display for an immersive viewing experience.",
                code: "GALAXYS21ULTRA",
                price: 1299.99,
                thumbnail: "https://example.com/galaxys21ultra.jpg",
                stock: 5,
                status: true
            },
            {
                title: "Dell XPS 15",
                category: "Laptops",
                description: "The Dell XPS 15 is a high-performance laptop with a 15.6-inch InfinityEdge display, Intel Core i7 processor, and NVIDIA GeForce graphics for seamless multitasking and gaming.",
                code: "XPS15",
                price: 1799.99,
                thumbnail: "https://example.com/xps15.jpg",
                stock: 8,
                status: true
            },
            {
                title: "Apple MacBook Pro",
                category: "Laptops",
                description: "The Apple MacBook Pro features a stunning Retina display, M1 chip for fast performance, and up to 20 hours of battery life, making it the ultimate productivity companion.",
                code: "MACBOOKPRO",
                price: 1499.99,
                thumbnail: "https://example.com/macbookpro.jpg",
                stock: 3,
                status: true
            },
            {
                title: "Sony PlayStation 5",
                category: "Gaming Consoles",
                description: "Experience the next generation of gaming with the Sony PlayStation 5. Enjoy stunning 4K graphics, lightning-fast load times, and immersive gameplay like never before.",
                code: "PS5",
                price: 499.99,
                thumbnail: "https://example.com/ps5.jpg",
                stock: 0,
                status: false
            },
            {
                title: "Microsoft Xbox Series X",
                category: "Gaming Consoles",
                description: "The Microsoft Xbox Series X delivers true 4K gaming, ultra-low latency, and support for ray tracing, giving you the ultimate gaming experience right in your living room.",
                code: "XBOXSERIESX",
                price: 499.99,
                thumbnail: "https://example.com/xboxseriesx.jpg",
                stock: 7,
                status: true
            },
            {
                title: "LG OLED55C1PUB OLED TV",
                category: "Televisions",
                description: "The LG OLED55C1PUB OLED TV offers breathtaking picture quality with perfect blacks and infinite contrast. Enjoy your favorite movies and shows in stunning detail and clarity.",
                code: "OLED55C1PUB",
                price: 1999.99,
                thumbnail: "https://example.com/oled55c1pub.jpg",
                stock: 12,
                status: true
            },
            {
                title: "Canon EOS R5",
                category: "Cameras",
                description: "The Canon EOS R5 is a professional-grade mirrorless camera with a 45MP full-frame sensor, 8K video recording capabilities, and advanced autofocus for stunning image quality and versatility.",
                code: "EOSR5",
                price: 3799.99,
                thumbnail: "https://example.com/eosr5.jpg",
                stock: 2,
                status: true
            },
            {
                title: "GoPro HERO9 Black",
                category: "Action Cameras",
                description: "Capture your adventures in stunning 5K video with the GoPro HERO9 Black. This rugged action camera features HyperSmooth 3.0 stabilization and a front-facing display for easy framing.",
                code: "HERO9BLACK",
                price: 449.99,
                thumbnail: "https://example.com/hero9black.jpg",
                stock: 15,
                status: true
            },
            {
                title: "Bose QuietComfort 35 II",
                category: "Headphones",
                description: "Immerse yourself in your favorite music with the Bose QuietComfort 35 II. These wireless noise-canceling headphones deliver exceptional sound quality and all-day comfort.",
                code: "QUIETCOMFORT35II",
                price: 299.99,
                thumbnail: "https://example.com/quietcomfort35ii.jpg",
                stock: 6,
                status: true
            },
            {
                title: "Apple AirPods Pro",
                category: "Earphones",
                description: "Experience true wireless freedom with the Apple AirPods Pro. These earphones feature active noise cancellation, a customizable fit, and immersive sound for a premium listening experience.",
                code: "AIRPODSPRO",
                price: 249.99,
                thumbnail: "https://example.com/airpodpro.jpg",
                stock: 9,
                status: true
            },
            {
                title: "Samsung Galaxy Tab S7",
                category: "Tablets",
                description: "The Samsung Galaxy Tab S7 is a powerful tablet with a stunning 11-inch display, S Pen support, and a long-lasting battery, perfect for productivity and entertainment on the go.",
                code: "GALAXYTABS7",
                price: 649.99,
                thumbnail: "https://example.com/galaxytabs7.jpg",
                stock: 4,
                status: true
            },
            {
                title: "Nintendo Switch",
                category: "Gaming Consoles",
                description: "The Nintendo Switch is a versatile gaming console that allows you to play at home or on the go. Enjoy a wide range of games and multiplayer fun with family and friends.",
                code: "SWITCH",
                price: 299.99,
                thumbnail: "https://example.com/switch.jpg",
                stock: 11,
                status: true
            },
            {
                title: "Razer BlackWidow Elite Mechanical Gaming Keyboard",
                category: "Gaming Keyboards",
                description: "The Razer BlackWidow Elite is a high-performance mechanical gaming keyboard with customizable Chroma RGB lighting, programmable macros, and a comfortable wrist rest.",
                code: "BLACKWIDOWELITE",
                price: 169.99,
                thumbnail: "https://example.com/blackwidowelite.jpg",
                stock: 5,
                status: true
            },
            {
                title: "Logitech MX Master 3 Wireless Mouse",
                category: "Computer Accessories",
                description: "The Logitech MX Master 3 is an advanced wireless mouse with precise tracking, customizable buttons, and cross-computer control, designed for productivity and comfort.",
                code: "MXMASTER3",
                price: 99.99,
                thumbnail: "https://example.com/mxmaster3.jpg",
                stock: 13,
                status: true
            },
            {
                title: "Fitbit Versa 3",
                category: "Smartwatches",
                description: "The Fitbit Versa 3 is a feature-packed smartwatch with built-in GPS, heart rate monitoring, and a variety of fitness and health tracking capabilities for an active lifestyle.",
                code: "VERSA3",
                price: 229.99,
                thumbnail: "https://example.com/versa3.jpg",
                stock: 7,
                status: true
            },
            {
                title: "Amazon Echo Dot (4th Gen)",
                category: "Smart Speakers",
                description: "The Amazon Echo Dot (4th Gen) is a compact and smart speaker powered by Alexa. Enjoy hands-free voice control, music streaming, and smart home automation in any room.",
                code: "ECHODOT4",
                price: 49.99,
                thumbnail: "https://example.com/echodot4.jpg",
                stock: 16,
                status: true
            },
            {
                title: "Google Nest Hub (2nd Gen)",
                category: "Smart Displays",
                description: "The Google Nest Hub (2nd Gen) is a smart display with a 7-inch touch screen and Google Assistant built-in. Use it to control your smart home devices, watch videos, and more.",
                code: "NESTHUB2",
                price: 99.99,
                thumbnail: "https://example.com/nesthub2.jpg",
                stock: 3,
                status: true
            },
            {
                title: "Microsoft Surface Pro 7",
                category: "Tablets",
                description: "The Microsoft Surface Pro 7 is a versatile 2-in-1 tablet that combines the power of a laptop with the portability of a tablet. It features a high-resolution touch display and runs on Windows 10.",
                code: "SURFACEPRO7",
                price: 899.99,
                thumbnail: "https://example.com/surfacepro7.jpg",
                stock: 6,
                status: true
            },
            {
                title: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
                category: "Headphones",
                description: "The Sony WH-1000XM4 are premium wireless headphones with industry-leading noise cancellation, immersive sound, and long battery life. Perfect for music lovers and frequent travelers.",
                code: "WH1000XM4",
                price: 349.99,
                thumbnail: "https://example.com/wh1000xm4.jpg",
                stock: 9,
                status: true
            }
        ]

        await productModel.insertMany(products);
    }

    insertOne = async (product) => {
        await productModel.create(product);
    }

    updateOne = async (id, product) => {
        await productModel.updateOne({ _id: id }, product);
    }

    deleteOne = async (id) => {
        await productModel.deleteOne({ _id: id });
    }
}