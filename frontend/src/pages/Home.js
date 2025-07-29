import React from 'react'
import CategoryList from '../components/CategoryList'
import VerticalCardProduct from '../components/VerticalCardProduct'
import Footer from '../components/Footer'
import photo from '../assest/1.jpg'
import photo1 from '../assest/4.jpg'
import photo2 from '../assest/5.jpg'

const Home = () => {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">

      {/* Full Screen Hero Slider - Electronics Focused */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Slideshow with electronics images */}
        <div className="absolute inset-0 flex animate-slideshow">
          <img 
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Macbook Pro" 
            className="w-full h-full object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Smartphones" 
            className="w-full h-full object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Electronics Setup" 
            className="w-full h-full object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Smartwatch" 
            className="w-full h-full object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Camera Gear" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Floating Company name and tagline - centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
          <div className="p-8 rounded-2xl animate-float">
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-wide mb-4">
              {/* <span className="text-red-500">Cart</span>
              <span className="text-white">Sure</span> */}
              <span className="text-gray-900">CartSureX</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              ~Trust and Secure~
            <br></br>
              Your Trusted Electronics Marketplace with Digital Warranty Protection
            </p>
            
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            <span className="relative">
              Explore Categories
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></span>
            </span>
          </h2>
          <CategoryList />
        </div>
      </section>

      {/* Mobile Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="relative">
              Trending Mobiles
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-red-500 rounded-full"></span>
            </span>
          </h2>
          <div className="animate-slideUp">
            <VerticalCardProduct category={"mobiles"} heading={""} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            <span className="relative">
              What Customers Say
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-60 h-1 bg-red-600 rounded-full"></span>
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rahul Sharma',
                role: 'Tech Enthusiast',
                comment: 'The warranty tracking feature saved me ₹15,000 when my laptop needed repairs. Absolutely essential for gadget buyers!',
                rating: 5,
                img: 'https://i.pravatar.cc/150?img=32',
                bg: 'bg-red-600'
              },
              {
                name: 'Priya Patel',
                role: 'Photographer',
                comment: 'Never lost a warranty again! Plus their electronics selection is top-notch with genuine products.',
                rating: 4,
                img: 'https://i.pravatar.cc/150?img=45',
                bg: 'bg-gray-900'
              },
              {
                name: 'Arjun Mehta',
                role: 'Gamer',
                comment: 'Fast delivery and the best prices for gaming gear. Their warranty management is a game-changer!',
                rating: 5,
                img: 'https://i.pravatar.cc/150?img=12',
                bg: 'bg-red-600'
              }
            ].map((t, i) => (
              <div 
                key={i} 
                className={`${t.bg} p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="flex items-start mb-6">
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-white">{t.name}</h4>
                    <p className="text-white/80 text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-white/90 italic mb-4">"{t.comment}"</p>
                <div className="flex">
                  {[...Array(t.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-yellow-300 mr-1"></i>
                  ))}
                  {[...Array(5 - t.rating)].map((_, i) => (
                    <i key={i + t.rating} className="bi bi-star text-yellow-300/50 mr-1"></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-600">
            <span className="relative">
              About CartSureX
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-900 rounded-full"></span>
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                alt="Our Team" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="animate-fadeInRight">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Trusted Electronics Partner</h3>
              <p className="text-gray-600 mb-4 text-1.5xl">
                Founded in 2023, CartSureX has quickly become India's most trusted platform for electronics shopping with integrated digital warranty management.
              </p>
              <p className="text-gray-600 mb-4 text-1.5xl">
                We partner with top brands like Apple, Samsung, Sony, and OnePlus to bring you authentic products with manufacturer warranties, all while providing our own warranty tracking layer.
              </p>
              <p className="text-gray-600 mb-6 text-1.5xl">
                Our mission is to make electronics ownership hassle-free by eliminating paper warranties and providing instant access to your purchase history and warranty details.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h4 className="font-bold text-gray-800">50,000+</h4>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800">100+</h4>
                  <p className="text-sm text-gray-600">Brand Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Enhanced */}
      <section className="py-36 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="relative">
              Why Choose CartSureX
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-red-500 rounded-full"></span>
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Digital Warranty Vault',
                desc: 'All your warranties securely stored in one place with automatic expiry alerts and easy claim process.',
                icon: 'bi bi-shield-lock text-4xl',
                animation: 'hover:animate-pulse'
              },
              {
                title: 'Authentic Products',
                desc: 'Direct partnerships with brands ensure you get 100% genuine products with manufacturer warranties.',
                icon: 'bi bi-patch-check text-4xl',
                animation: 'hover:animate-bounce'
              },
              {
                title: 'Expert Support',
                desc: 'Our tech experts are available 24/7 to help with product selection and warranty claims.',
                icon: 'bi bi-headset text-4xl',
                animation: 'hover:animate-ping'
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white/10 backdrop-blur-sm p-10 rounded-xl border border-white/20 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white/20 group"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {/* <div className={`${feature.animation} w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 mx-auto group-hover:bg-white/20 transition-all duration-300`}>
                  <i className={feature.icon}></i>
                </div> */}
                <h3 className="text-xl font-bold text-center mb-3">{feature.title}</h3>
                <p className="text-white/80 text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers Section - Enhanced */}
      <section className="py-8 bg-white-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            <span className="relative">
              Meet The Team
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-red-500 rounded-full"></span>
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Niyati Nagar',
                role: 'Full Stack Developer',
                bio: 'Specializes in creating intuitive user interfaces with React and implementing smooth animations for enhanced user experience.',
                img: photo,
                skills: ['React', 'Animations','node.js'],
                social: {
                  github: '#',
                  linkedin: '#',
                  twitter: '#'
                }
              },
              {
                name: 'Pankaj Mainani',
                role: 'Backend Developer',
                bio: 'Focuses on building robust server architectures and database systems to ensure seamless data management and API integrations.',
                img: photo2,
                skills: ['Node.js', 'MongoDB', 'API', 'Security'],
                social: {
                  github: '#',
                  linkedin: '#',
                  twitter: '#'
                }
              },
              {
                name: 'Vraj Sanghavi',
                role: 'Full Stack Developer',
                bio: 'Bridges frontend and backend development while managing deployment pipelines and cloud infrastructure for optimal performance.',
                img: photo1,
                skills: ['React', 'Node.js', 'AWS', 'CI/CD'],
                social: {
                  github: '#',
                  linkedin: '#',
                  twitter: '#'
                }
              }
            ].map((dev, idx) => (
              // <div 
              //   key={i} 
              //   className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              //   style={{ animationDelay: `${i * 0.2}s` }}
              
              // >
              <div 
                key={idx} 
                className="bg-white-6 backdrop-blur-sm p-2 rounded-xl border hover:shadow-xl border-white/20 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white/20 group"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <img 
                  src={dev.img} 
                  alt={dev.name} 
                  className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{dev.name}</h3>
                <p className="text-red-600 font-medium mb-3">{dev.role}</p>
                <p className="text-gray-600 mb-4">{dev.bio}</p>
              
                <div className="flex flex-wrap justify-center gap-2">
                  {dev.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideshow {
          0% { transform: translateX(0); }
          20% { transform: translateX(0); }
          25% { transform: translateX(-100%); }
          45% { transform: translateX(-100%); }
          50% { transform: translateX(-200%); }
          70% { transform: translateX(-200%); }
          75% { transform: translateX(-300%); }
          95% { transform: translateX(-300%); }
          100% { transform: translateX(-400%); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        .animate-fadeInDown { animation: fadeInDown 1s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.8s ease-out; }
        .animate-fadeInLeft { animation: fadeInLeft 1s ease-out; }
        .animate-fadeInRight { animation: fadeInRight 1s ease-out; }
        .animate-slideshow { animation: slideshow 25s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default Home