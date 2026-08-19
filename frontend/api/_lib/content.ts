import { sql } from "./db";
import type { SiteContent } from "../../src/lib/content/types";

/**
 * Reads the whole site content in one round trip. The public site needs all of
 * it on first paint, so splitting it into per-collection endpoints would only
 * add latency.
 */
export const loadContent = async (includeDrafts: boolean): Promise<SiteContent> => {
  const [profile, services, projects, skills, experience, education, posts] = await Promise.all([
    sql`select * from profile where id = 1`,
    sql`select * from services order by position, id`,
    sql`select * from projects order by position, id`,
    sql`select * from skills order by position, id`,
    sql`select * from experience order by position, id`,
    sql`select * from education order by position, id`,
    includeDrafts
      ? sql`select * from posts order by date desc`
      : sql`select * from posts where published = true order by date desc`,
  ]);

  const row = profile[0];
  const empty = { fr: "", en: "" };

  return {
    profile: {
      name: row?.name ?? "",
      email: row?.email ?? "",
      location: row?.location ?? "",
      greeting: row?.greeting ?? empty,
      role: row?.role ?? empty,
      bio: row?.bio ?? empty,
      availability: row?.availability ?? empty,
      aboutTitle: row?.about_title ?? empty,
      aboutDescription: row?.about_description ?? empty,
      aboutHighlight: row?.about_highlight ?? empty,
      socials: row?.socials ?? [],
    },
    services: services.map((s) => ({
      id: s.id,
      icon: s.icon,
      title: s.title,
      description: s.description,
    })),
    projects: projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      url: p.url,
      tech: p.tech,
    })),
    skills: skills.map((s) => ({
      id: s.id,
      icon: s.icon,
      title: s.title,
      skills: s.skills,
      level: s.level,
      percent: s.percent,
    })),
    experience: experience.map((e) => ({
      id: e.id,
      title: e.title,
      company: e.company,
      location: e.location,
      period: e.period,
      description: e.description,
      tech: e.tech,
    })),
    education: education.map((e) => ({
      id: e.id,
      title: e.title,
      school: e.school,
      period: e.period,
      description: e.description,
    })),
    posts: posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      cover: p.cover,
      tags: p.tags,
      date: typeof p.date === "string" ? p.date : new Date(p.date).toISOString().slice(0, 10),
      published: p.published,
    })),
  } as SiteContent;
};

/**
 * Replaces the stored content with what the dashboard holds. A single author
 * edits one document at a time, so a full transactional replace is both the
 * simplest contract and free of partial-write states.
 */
export const saveContent = async (content: SiteContent) => {
  const p = content.profile;
  const json = (value: unknown) => JSON.stringify(value);

  const statements = [
    sql`
      insert into profile (id, name, email, location, greeting, role, bio, availability,
                           about_title, about_description, about_highlight, socials, updated_at)
      values (1, ${p.name}, ${p.email}, ${p.location},
              ${json(p.greeting)}::jsonb, ${json(p.role)}::jsonb,
              ${json(p.bio)}::jsonb, ${json(p.availability)}::jsonb,
              ${json(p.aboutTitle)}::jsonb, ${json(p.aboutDescription)}::jsonb,
              ${json(p.aboutHighlight)}::jsonb, ${json(p.socials)}::jsonb, now())
      on conflict (id) do update set
        name = excluded.name, email = excluded.email, location = excluded.location,
        greeting = excluded.greeting, role = excluded.role, bio = excluded.bio,
        availability = excluded.availability, about_title = excluded.about_title,
        about_description = excluded.about_description, about_highlight = excluded.about_highlight,
        socials = excluded.socials, updated_at = now()
    `,

    sql`delete from services where id <> all(${content.services.map((s) => s.id)}::text[])`,
    ...content.services.map(
      (item, index) => sql`
        insert into services (id, position, icon, title, description)
        values (${item.id}, ${index}, ${item.icon}, ${json(item.title)}::jsonb,
                ${json(item.description)}::jsonb)
        on conflict (id) do update set
          position = excluded.position, icon = excluded.icon,
          title = excluded.title, description = excluded.description
      `,
    ),

    sql`delete from projects where id <> all(${content.projects.map((item) => item.id)}::text[])`,
    ...content.projects.map(
      (item, index) => sql`
        insert into projects (id, position, title, description, image, url, tech)
        values (${item.id}, ${index}, ${json(item.title)}::jsonb, ${json(item.description)}::jsonb,
                ${item.image}, ${item.url}, ${item.tech}::text[])
        on conflict (id) do update set
          position = excluded.position, title = excluded.title,
          description = excluded.description, image = excluded.image,
          url = excluded.url, tech = excluded.tech
      `,
    ),

    sql`delete from skills where id <> all(${content.skills.map((item) => item.id)}::text[])`,
    ...content.skills.map(
      (item, index) => sql`
        insert into skills (id, position, icon, title, skills, level, percent)
        values (${item.id}, ${index}, ${item.icon}, ${json(item.title)}::jsonb,
                ${item.skills}::text[], ${json(item.level)}::jsonb, ${item.percent})
        on conflict (id) do update set
          position = excluded.position, icon = excluded.icon, title = excluded.title,
          skills = excluded.skills, level = excluded.level, percent = excluded.percent
      `,
    ),

    sql`delete from experience where id <> all(${content.experience.map((item) => item.id)}::text[])`,
    ...content.experience.map(
      (item, index) => sql`
        insert into experience (id, position, title, company, location, period, description, tech)
        values (${item.id}, ${index}, ${json(item.title)}::jsonb, ${item.company},
                ${item.location}, ${json(item.period)}::jsonb,
                ${json(item.description)}::jsonb, ${item.tech}::text[])
        on conflict (id) do update set
          position = excluded.position, title = excluded.title, company = excluded.company,
          location = excluded.location, period = excluded.period,
          description = excluded.description, tech = excluded.tech
      `,
    ),

    sql`delete from education where id <> all(${content.education.map((item) => item.id)}::text[])`,
    ...content.education.map(
      (item, index) => sql`
        insert into education (id, position, title, school, period, description)
        values (${item.id}, ${index}, ${json(item.title)}::jsonb, ${item.school},
                ${json(item.period)}::jsonb, ${json(item.description)}::jsonb)
        on conflict (id) do update set
          position = excluded.position, title = excluded.title, school = excluded.school,
          period = excluded.period, description = excluded.description
      `,
    ),

    sql`delete from posts where id <> all(${content.posts.map((post) => post.id)}::text[])`,
    ...content.posts.map(
      (post) => sql`
        insert into posts (id, slug, title, excerpt, body, cover, tags, date, published, updated_at)
        values (${post.id}, ${post.slug}, ${json(post.title)}::jsonb, ${json(post.excerpt)}::jsonb,
                ${json(post.body)}::jsonb, ${post.cover}, ${post.tags}::text[], ${post.date},
                ${post.published}, now())
        on conflict (id) do update set
          slug = excluded.slug, title = excluded.title, excerpt = excluded.excerpt,
          body = excluded.body, cover = excluded.cover, tags = excluded.tags,
          date = excluded.date, published = excluded.published, updated_at = now()
      `,
    ),
  ];

  // All or nothing: a failed statement leaves the previous content in place.
  await sql.transaction(statements);
};
