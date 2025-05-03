import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script'
import blog from '../data/blogs';
import { Footer } from '../components/Footer';
import { ScrollTop } from '../components/ScrollTop';
import * as S from '../styles/Blogs';
import { FiltersContainer, BButton } from '../styles/Blogs';
import * as T from '../styles/styles';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';
import { ArrowRight } from 'phosphor-react';
import { Publications } from '../components/Publications';
import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const botkey = process.env.NEXT_PUBLIC_BOTKEY_URL;

interface BlogProps {
  target: HTMLInputElement;
}

export default function Blog() {
  const [query, setQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date'); // Default sorting by date
  const [selectedCategory, setSelectedCategory] = useState(''); // Default no category selected
  const [startDate, setStartDate] = useState(''); // Start date for filtering
  const [endDate, setEndDate] = useState(''); // End date for filtering
  const [readTime, setReadTime] = useState(''); // Single read time for filtering

  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<'en' | 'ta'>('en');

  useEffect(() => {
    const { locale } = router;
    //setCurrentLang(locale as 'en' | 'ta');
  }, [router.locale]);

  const handleChange = (e: BlogProps) => {
    setQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleReadTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReadTime(e.target.value);
  };

  const handleClearFilters = () => {
    setQuery('');
    setSortCriteria('date');
    setSelectedCategory('');
    setStartDate('');
    setEndDate('');
    setReadTime('');
  };

  const filteredBlogs = blog
    .filter(blog => {
      const matchesQuery = blog.title[currentLang].toLowerCase().includes(query.toLowerCase());
      return matchesQuery;
    })
    .filter(blog => {
      const matchesCategory = selectedCategory === '' || blog.tags.some(tag => tag.name === selectedCategory);
      return matchesCategory;
    })
    .filter(blog => {
      const [day, month, year] = blog.date[currentLang].split('/').map(Number);
      const blogDate = new Date(year, month - 1, day).getTime();
      const start = startDate ? new Date(startDate).getTime() : -Infinity;
      const end = endDate ? new Date(endDate).getTime() : Infinity;
      const matchesDate = blogDate >= start && blogDate <= end;
      return matchesDate;
    })
    .filter(blog => {
      const readTimeValue = parseInt(blog.read[currentLang]);
      const readTimeFilter = readTime ? parseInt(readTime) : -Infinity;
      const matchesReadTime = readTimeFilter === -Infinity || readTimeValue === readTimeFilter;
      return matchesReadTime;
    });

  const sortedBlogs = filteredBlogs.sort((a, b) => {
    if (sortCriteria === 'date') {
      const [dayA, monthA, yearA] = a.date[currentLang].split('/').map(Number);
      const [dayB, monthB, yearB] = b.date[currentLang].split('/').map(Number);
      return new Date(yearB, monthB - 1, dayB).getTime() - new Date(yearA, monthA - 1, dayA).getTime();
    }
    return a.title[currentLang].localeCompare(b.title[currentLang]);
  });

  return (
    <>
      <Head>
        <title>{currentLang === 'ta' ? 'பதிவுகள் | சரவணகுமார்' : 'Blogs | RaniyDream'}</title>
        <meta property="og:title" content={currentLang === 'ta' ? 'வலைப்பதிவுகள் | சரவணகுமார்' : 'Blogs | RaniyDream'} />
      </Head>

      <ScrollTop />
      <T.Section>
        <T.Title>
          <p>../{currentLang === 'ta' ? 'வலைப்பதிவுகள்' : 'blogs'}</p>
          {currentLang === 'ta' ? 'பதிவுகள்' : 'Posts'}
          <span>
            <HiOutlineDesktopComputer />{currentLang === 'ta' ? 'வலைப்பதிவு' : 'Blog'}
          </span>
        </T.Title>
        <T.Description>
          {currentLang === 'ta' ? 'எனது வலைப்பதிவுகள் ஹாஷ்நோட் இணையதளத்தால் இயக்கப்படுகின்றன. நான் தொழில்நுட்பம், நிரலாக்கம் மற்றும் வாழ்க்கை உட்பட பல்வேறு தலைப்புகளைப் பற்றி எழுதுகிறேன். தயங்காமல் அவற்றைப் பாருங்கள்!' : 'My blogs are powered by Hashnode website. I write about various topics including tech, programming, and life. Feel free to check them out!'}
        </T.Description>

        <S.BlogContainer>
          <S.BlogContent>
            <div className="search">
              <p>{currentLang === 'ta' ? 'வலைப்பதிவு பெயரால் தேடுங்கள்' : 'Search by Blog name'}</p>
              <div className="input">
                <input
                  type="text"
                  name="search"
                  placeholder={currentLang === 'ta' ? 'இங்கே தட்டச்சு செய்யவும்...' : 'Type here...'}
                  value={query}
                  onChange={handleChange}
                />
                <FaSearch />
              </div>
            </div>

            <FiltersContainer>
              <select onChange={handleSortChange} value={sortCriteria}>
                <option value="date">{currentLang === 'ta' ? 'தேதியின்படி வரிசைப்படுத்து' : 'Sort by Date'}</option>
                <option value="title">{currentLang === 'ta' ? 'தலைப்பின்படி வரிசைப்படுத்து' : 'Sort by Title'}</option>
              </select>

              <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="">{currentLang === 'ta' ? 'அனைத்து வகைகளும்' : 'All Categories'}</option>
                {Array.from(new Set(blog.flatMap(blog => blog.tags.map(tag => tag.name)))).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <div className="date-filters">
                <label>
                  {currentLang === 'ta' ? 'இருந்து:' : 'From:'}
                  <input type="date" value={startDate} onChange={handleStartDateChange} />
                </label>
                <label>
                  {currentLang === 'ta' ? 'வரை:' : 'To:'}
                  <input type="date" value={endDate} onChange={handleEndDateChange} />
                </label>
              </div>

              <div className="read-time-filters">
                <label>
                  {currentLang === 'ta' ? 'வாசிப்பு நேரம்:' : 'Read Time:'}
                  <select onChange={handleReadTimeChange} value={readTime}>
                    <option value="">{currentLang === 'ta' ? 'அனைத்து வாசிப்பு நேரங்கள்' : 'All Read Times'}</option>
                    {Array.from(new Set(blog.map(blog => blog.read[currentLang]))).map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </label>
              </div>
            </FiltersContainer>

            <BButton onClick={handleClearFilters}>
              {currentLang === 'ta' ? 'வடிப்பான்களை அழிக்கவும்' : 'Clear Filters'}
            </BButton>

            {!sortedBlogs.length && (
              <h3 className="not-found">{currentLang === 'ta' ? 'வலைப்பதிவு கிடைக்கவில்லை 🙁' : 'Blog not found 🙁'}</h3>
            )}

            {sortedBlogs.map(blog => (
              <div key={blog.id}>
                <div className="border" />
                <S.BlogItem>
                  <div className="banner">
                    <Image
                      width={500}
                      height={300}
                      src={blog.img}
                      alt={blog.title[currentLang]}
                    />
                  </div>
                  <div>
                    <div className="title">
                      <h2>{blog.title[currentLang]}</h2>
                    </div>
                    <div className="description">
                      <p>{blog.description[currentLang]}</p>
                      <p className="date">{currentLang === 'ta' ? 'வெளியிடப்பட்ட தேதி :' : 'Date Published :'} {blog.date[currentLang]}</p>
                      <p className="read">{currentLang === 'ta' ? 'வாசிப்பு நேரம் :' : 'Reading Time :'} {blog.read[currentLang]}</p>
                      <div className="tags">
                        {blog.tags.map(tag => (
                          <span key={tag.name}>{tag.name}</span>
                        ))}
                      </div>
                    </div>
                    <Link href={`/blog/${blog.id}`}>
                      <T.ButtonAlternatives>
                        {currentLang === 'ta' ? 'வலைப்பதிவைப் பார்க்க' : 'View Blog'}
                        <ArrowRight
                          style={{ marginBottom: '-0.1rem' }}
                          weight="bold"
                          size={16}
                        />
                      </T.ButtonAlternatives>
                    </Link>
                  </div>
                </S.BlogItem>
              </div>
            ))}

            <p className="github">
              {currentLang === 'ta' ? 'ஏய், ஏய், ஏய்... எனக்கு இன்னும் அதிகம் உள்ளது ' : 'Hey, hey, hey... I have even more on '}
              <a href="https://RaniyDream2003.hashnode.dev/">{currentLang === 'ta' ? 'இங்கே' : 'here'}</a>!!
            </p>
          </S.BlogContent>
        </S.BlogContainer>
      </T.Section>
      <Publications />
      <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></script>
      <script src={botkey} defer></script>
      <Footer />
    </>
  );
}