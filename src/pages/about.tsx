import Head from 'next/head'
import Link from 'next/link'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ScrollTop } from '../components/ScrollTop'
import { BiUserPin } from 'react-icons/bi'
import { AiFillGithub } from 'react-icons/ai'
import { RiWhatsappFill } from 'react-icons/ri'
import { BsLinkedin } from 'react-icons/bs'
import { GrMail } from 'react-icons/gr'
import { ArrowLeft, ChatCenteredText, Image as IconImage, YoutubeLogo, Hash, InstagramLogo } from 'phosphor-react'
import * as S from '../styles/about'
import { ButtonAlt, Section, Title, ButtonSecondary } from '../styles/styles'
import { Instagram } from './api/Instagram'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import React from 'react'
import { Linkedin } from './api/Linkedin'

const botkey = process.env.NEXT_PUBLIC_BOTKEY_URL;

interface DashboardPageProps {
  fallback: any;
}
export default function About() {
  const { t, i18n } = useTranslation('common'); // Use the 'common' namespace
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<'en' | 'ta'>('en');

  useEffect(() => {
    const { locale } = router;
    //setCurrentLang(locale as 'en' | 'ta');
  }, [router.locale]);

  return <>
    <Head>
      <title>{currentLang === 'ta' ? 'பற்றி | சரவணகுமார்' : 'About | Christopher'}</title>
      <meta
        name="description"
        content={currentLang === 'ta' ? 'நான் சரவணகுமார், வேலம்மல் பொறியியல் கல்லூரியின் மாணவர், எலக்ட்ரானிக்ஸ் மற்றும் கம்யூனிகேஷன் இன்ஜினியரிங் படித்து வருகிறேன் மற்றும் தொழில்நுட்பத்தில் ஒரு வலுவான அடித்தளத்தை உருவாக்குகிறேன்.' : 'I am RaniyDream, a proud student of Velammal Engineering College, where I am pursuing a Bachelors degree in Electronics and Communication Engineering and building a solid foundation in technology.'}
      />
      <meta property="og:title" content={currentLang === 'ta' ? 'பற்றி | சரவணகுமார்' : 'About | RaniyDream'} />
      <meta
        property="og:description"
        content={currentLang === 'ta' ? 'நான் சரவணகுமார், வேலம்மல் பொறியியல் கல்லூரியின் மாணவர், எலக்ட்ரானிக்ஸ் மற்றும் கம்யூனிகேஷன் இன்ஜினியரிங் படித்து வருகிறேன் மற்றும் தொழில்நுட்பத்தில் ஒரு வலுவான அடித்தளத்தை உருவாக்குகிறேன்.' : 'I am RaniyDream, a proud student of Velammal Engineering College, where I am pursuing a Bachelors degree in Electronics and Communication Engineering and building a solid foundation in technology.'}
      />
    </Head>

    <ScrollTop />
    <Section>
      <S.AboutContainer>
        <Title>
          <p>{currentLang === 'ta' ? '../பற்றி' : '../about'}  </p>
          {currentLang === 'ta' ? 'என்னைப் பற்றி!!' : 'About Myself!!'}
          <span>
            <BiUserPin /> {currentLang === 'ta' ? 'பற்றி' : 'About'}
          </span>
        </Title>

        <S.AboutContent>
          <S.AboutImage>
            <img
              className="AboutImg"
              src="/chris.jpg"
              alt="RaniyDream"
            />

            {/* <div className="links">
              <ul>
                <Link
                  href={'https://github.com/RaniyDream2003'}
                  target="_blank"
                  aria-label="Github">

                  <AiFillGithub size={25} />@RaniyDream2003
                </Link>
                <Link
                  href={'https://www.linkedin.com/in/saravanaramaswamy2003/'}
                  target="_blank"
                  aria-label="Linkedin">

                  <BsLinkedin size={25} />@saravanaramaswamy2003
                </Link>
                <Link
                  href={'https://api.whatsapp.com/send?phone=+13155476302'}
                  target="_blank"
                  aria-label="WhatsApp">

                  <RiWhatsappFill size={25} />+1 315 547 6302
                </Link>
                <Link
                  href={'mailto:kestonatwater1218@gmail.com'}
                  className="email"
                  target="_blank"
                  aria-label="email">

                  <GrMail size={25} />kestonatwater1218@gmail.com
                </Link>
              </ul>
            </div> */}

            <S.AboutContact>
              <h3>
                {currentLang === 'ta' ? 'நாம் பேசலாம், ஒருவேளை ஒரு அற்புதமான திட்டத்தை உருவாக்கலாம்?' : 'Lets talk, maybe create an amazing project together?'}
              </h3>
              <Link href={'/projects'}>

                <ButtonAlt>{currentLang === 'ta' ? 'தொடர்பு கொள்ளவும்' : 'Portfolio'}</ButtonAlt>

              </Link>
            </S.AboutContact>
          </S.AboutImage>
          <S.AboutDescription>
            <p style={{ textAlign: 'justify' }}>
              {currentLang === 'ta' ? '👋 .' : '👋 Hi! I am Christopher Musenze, a Senior Software Engineer with over a decade of experience steering software development at leading companies.'}
            </p>
            <p style={{ textAlign: 'justify' }}>
              {currentLang === 'ta' ? '💻 .' : '💻I am eager to make the most of my expertise and deliver solutions that make a difference..'}
            </p>
            <p style={{ textAlign: 'justify' }}>
              {currentLang === 'ta' ? '🎉  💥.' : '🎉 Throughout my career, I have rolled up my sleeves and worked hands-on with a variety of technologies, including Angular, React, Vue.js, Python, Node.js, and Java. My efforts have led to significant boosts in user engagement and enhanced operational efficiency.💥.'}
            </p>
            <p style={{ textAlign: 'justify' }}>
              {currentLang === 'ta' ? '🧩 என் நேரத்தில், புதிர்கள் மற்றும் மூளைக்கவசங்களை தீர்க்க நான் விரும்புகிறேன், இது எனக்கு கூர்மையாகவும் என் பிரச்சினை தீர்க்கும் திறன்களை சரியாக வைத்திருக்கவும் உதவுகிறது. உலகம் முழுவதும் புராணங்கள் மற்றும் புராணங்களை கற்றுக்கொள்வதில் நான் பெரிய ரசிகன், இது எனக்கு பல்வேறு கலாச்சாரங்கள் மற்றும் பாரம்பரியங்களைப் பற்றிய ஒரு பார்வையை அளிக்கிறது 🌍.' : '🧩 In my free time, I love to solve puzzles and brain teasers, which helps me stay sharp and keep my problem-solving skills on point. I am also a big fan of learning myths and legends from around the world 🌍, which gives me a glimpse into different cultures and traditions.'}
            </p>
            <p style={{ textAlign: 'justify' }}>
              {currentLang === 'ta' ? '🙌' : '🙌My journey has allowed me to craft robust RESTful APIs, implement smooth CI/CD processes, provide AI solutions, and elevate application performance—all while collaborating with talented teams.'}
            </p>
            <p style={{ textAlign: 'justify' }}>
              {currentLang === 'ta' ? '💪ம்🤝.' : '💪 With a solid foundation in Computer Science and an unwavering passion for innovation, I am excited to bring my skills to your projects and help drive your success.'}
            </p>
            <p style={{ textAlign: 'justify' }}>
              {currentLang === 'ta' ? '💪ம்🤝.' : '🤝 Let’s create something amazing together!. '}
            </p>
          </S.AboutDescription>
        </S.AboutContent>
      </S.AboutContainer>

      {/* Social Begins */}

      {/* <Title>
        {currentLang === 'ta' ? 'LinkedIn பதிவு' : 'LinkedIn Post'}
        <span>
          <BsLinkedin /> {currentLang === 'ta' ? 'சமீபத்திய' : 'Latest'}
        </span>
      </Title>
      <S.InBox>
        <Linkedin />
      </S.InBox>
      <Title>
        {currentLang === 'ta' ? 'இன்ஸ்டாகிராம் பதிவு' : 'Instagram Post'}
        <span>
          < InstagramLogo /> {currentLang === 'ta' ? 'சமீபத்திய' : 'Latest'}
        </span>
      </Title>
      <S.InBox>
        <Instagram />
      </S.InBox>
      <a style={{ textAlign: 'center' }}>
        {currentLang === 'ta' ? 'உங்கள் ❤️ ஐ காட்டுங்கள், விரும்பி கருத்து தெரிவிப்பதன் மூலம், மேலும் புதுப்பிப்புகளுக்கு எனது இன்ஸ்டாகிராமில் என்னை பின்தொடருங்கள்.' : 'Show your ❤️ by liking and commenting, Follow me on Instagram for more updates.'}
      </a> */}

      {/* Social Ends */}

      <Link href={'/#home'} legacyBehavior>
        <ButtonSecondary>
          <a>
            <ArrowLeft
              style={{ marginBottom: '-0.2rem' }}
              weight="bold"
              size={18}
            />{' '}
            {currentLang === 'ta' ? 'திரும்பி செல்' : 'Go Back'}
          </a>
        </ButtonSecondary>
      </Link>
    </Section>
    <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></script>
    <script src={botkey} defer></script>
    <Footer />
  </>;
}