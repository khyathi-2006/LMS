import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Course {
  _id: string;
  title: string;
  videoUrl: string;
}

const CourseVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  const handleProgressUpdate = async () => {
    const video = videoRef.current;
    if (!video) return;

    const watchedTime = video.currentTime;
    const totalDuration = video.duration;

    if (totalDuration > 0) {
      const progress = Math.min(Math.round((watchedTime / totalDuration) * 100), 100);
      const token = localStorage.getItem('token');

      await axios.patch(
        `http://localhost:5000/api/courses/${courseId}/progress`,
        { progress },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (progress === 100) {
        await axios.post(
          `http://localhost:5000/api/student/${courseId}/grades`,
          {
            courseId,
            assignmentName: 'Auto Test',
            marks: Math.floor(Math.random() * 10 + 15),
            totalMarks: 25,
            grade: 'A'
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await axios.post(
          `http://localhost:5000/api/student/${courseId}/attendance`,
          {
            courseId,
            date: new Date(),
            present: true,
            topic: 'Auto Topic'
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        setCourse(res.data);
        console.log("📹 Received videoUrl:", res.data.videoUrl); // ✅ Log here
      } catch (err) {
        console.error("❌ Failed to fetch course:", err);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('pause', handleProgressUpdate);
      video.addEventListener('ended', handleProgressUpdate);
    }
    return () => {
      if (video) {
        video.removeEventListener('pause', handleProgressUpdate);
        video.removeEventListener('ended', handleProgressUpdate);
      }
    };
  }, []);

  if (!course) {
    return <div>Loading video...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
  
      {course.videoUrl.includes("youtube.com") ? (
        <iframe
          width="100%"
          height="480"
          src={course.videoUrl}
          title="Course Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg w-full"
        ></iframe>
      ) : (
        <video
          ref={videoRef}
          controls
          className="w-full rounded-lg"
          src={course.videoUrl}
        />
      )}
    </div>
  );
  
};

export default CourseVideo;
