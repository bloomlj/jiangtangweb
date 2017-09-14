-- Table: public.makers

-- DROP TABLE public.makers;

CREATE TABLE public.makers
(
  id integer NOT NULL DEFAULT nextval('makers_id_seq'::regclass),
  login character varying(100),
  password character varying(100),
  name character varying(50),
  about text,
  created_at timestamp without time zone,
  updated_at timestamp without time zone,
  avatar character varying(255),
  CONSTRAINT makers_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.makers
  OWNER TO postgres;


  -- Table: public.files

  -- DROP TABLE public.files;

  CREATE TABLE public.files
  (
    id integer NOT NULL DEFAULT nextval('files_id_seq'::regclass),
    maker_id integer,
    org_name character varying(255),
    category character varying(50),
    mimetype character varying(50),
    filename character varying(255),
    note character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
  )
  WITH (
    OIDS=FALSE
  );
  ALTER TABLE public.files
    OWNER TO postgres;



    -- Table: public.things

    -- DROP TABLE public.things;

    CREATE TABLE public.things
    (
      id integer NOT NULL DEFAULT nextval('things_id_seq'::regclass),
      maker_id integer,
      title character varying(255),
      cover character varying(255),
      abstract text,
      content jsonb,
      category jsonb,
      copyright character varying(50),
      created_at timestamp without time zone,
      updated_at timestamp without time zone
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.things
      OWNER TO postgres;
