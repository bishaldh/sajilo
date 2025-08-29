'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CarDetailsView from './CarDetailsView';

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" +
      (currentSlide === 0 ? " slick-disabled" : "")
    }
    type="button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="" strokeLinecap="round" strokeLinejoin="round"></path></svg>
  </button>
)

const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    type="button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="" strokeLinecap="round" strokeLinejoin="round"> </path></svg>
  </button>
)

export default function CarsDetails1() {
  const router = useRouter();
  const id = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : undefined;
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    fetch(`/api/cars/${id}`)
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        setCar(data);
        setLoading(false);
      })
      .catch(e => {
        setError('Failed to load car details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{padding:'2rem', textAlign:'center'}}>Loading car details...</div>;
  if (error || !car) return <div style={{padding:'2rem', textAlign:'center', color:'red'}}>Failed to load car details.</div>;

  return <CarDetailsView car={car} />;
}

